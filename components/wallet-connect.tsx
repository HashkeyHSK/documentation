"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

// 扩展Window接口以包含ethereum属性
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletConnectProps {
  className?: string;
  message?: string;
  buttonText?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  buttonWidth?: string;
}

// HashKey Chain 网络参数
const HASHKEY_CHAIN = {
  chainId: '0xB1', // 十六进制的177
  chainName: 'HashKey Chain',
  nativeCurrency: {
    name: 'HSK',
    symbol: 'HSK',
    decimals: 18
  },
  rpcUrls: ['https://mainnet.hsk.xyz'],
  blockExplorerUrls: ['https://hashkey.blockscout.com/']
};

export function WalletConnect({
  className,
  message = "connect hashkey chain with okx wallet",
  buttonText = "Connect & Sign Message",
  variant = "default",
  buttonWidth = "220px",
}: WalletConnectProps) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'switching' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  
  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setStatus('error');
      setErrorMsg('No Ethereum wallet detected. Please install OKX Wallet or MetaMask.');
      return;
    }
    
    setStatus('connecting');
    try {
      // 请求账户访问
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      // 获取当前网络ID
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      // 如果不是HashKey Chain网络，尝试切换
      if (chainId !== HASHKEY_CHAIN.chainId) {
        setStatus('switching');
        try {
          // 尝试切换到HashKey Chain
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: HASHKEY_CHAIN.chainId }],
          });
        } catch (switchError: any) {
          // 如果链未添加到钱包中，尝试添加它
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [HASHKEY_CHAIN],
              });
            } catch (addError) {
              throw new Error('Failed to add HashKey Chain network to wallet.');
            }
          } else {
            throw new Error('Failed to switch to HashKey Chain network.');
          }
        }
      }
      
      // 构建消息
      const encodedMessage = `0x${Buffer.from(message).toString('hex')}`;
      
      // 请求签名
      const sig = await window.ethereum.request({
        method: 'personal_sign',
        params: [encodedMessage, accounts[0]],
      });
      
      setSignature(sig);
      setStatus('success');
    } catch (error) {
      console.error('Connection error:', error);
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };
  
  return (
    <div className={className}>
      <Button 
        variant={variant}
        onClick={connectWallet}
        disabled={status === 'connecting' || status === 'switching'}
        className="text-center flex items-center justify-center gap-2"
        style={{ minWidth: buttonWidth }}
      >
        <Image 
          src="/okxwallet.png" 
          alt="OKX Wallet" 
          width={20} 
          height={20} 
          className="rounded-full"
        />
        {status === 'connecting' ? 'Connecting...' : 
         status === 'switching' ? 'Switching to HashKey Chain...' : 
         buttonText}
      </Button>
      
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-green-700 dark:text-green-300 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="font-medium">Successfully signed message on HashKey Chain!</p>
          </div>
          <p className="mt-1 break-all font-mono text-xs">Signature: {signature}</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-red-700 dark:text-red-300 text-sm">
          <p>{errorMsg}</p>
        </div>
      )}
    </div>
  );
} 