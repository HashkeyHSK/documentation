// Helper function to generate valid HTML IDs from titles
export const generateId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
};

// Define the type for items in knowledgeItems array
export interface KnowledgeItemData {
  title: string;
  description: string;
  href: string; // This href is used for the card's link target
  category?: 'tech' | 'other'; // Added category field
}

// Define and export the static knowledge items data
export const knowledgeItems: KnowledgeItemData[] = [
  // Removed: Blockchain Explorers, Gas Fee Calculation, Ethereum Applications, Ethereum Development
  {
    title: 'RPC',
    description: 'Protocol allowing programs to request services from other computers without understanding network details.',
    href: '/Knowledge/RPC',
    category: 'tech',
  },
  {
    title: 'RISC-V',
    description: 'Open standard instruction set architecture based on reduced instruction set principles.',
    href: '/Knowledge/risc-v',
    category: 'tech',
  },
  {
    title: 'Patricia Trie',
    description: 'Efficient data structure for storing key-value pairs in blockchain state.',
    href: '/Knowledge/Patricia-Trie',
    category: 'tech',
  },
  {
    title: 'Merkle Tree',
    description: 'Cryptographic data structure enabling efficient data verification in blockchains.',
    href: '/Knowledge/merkle-tree',
    category: 'tech',
  },
  {
    title: 'ZK Proofs',
    description: 'Cryptographic methods allowing proof of knowledge without revealing actual information.',
    href: '/Knowledge/zk-proofs',
    category: 'tech',
  },
  {
    title: 'PoW',
    description: 'Consensus mechanism requiring computational work to validate transactions and create blocks.',
    href: '/Knowledge/pow',
    category: 'tech',
  },
  {
    title: 'Layer 2',
    description: 'Scaling solutions built on top of Layer 1 blockchains to improve throughput.',
    href: '/Knowledge/layer-2',
    category: 'tech',
  },
  {
    title: 'Layer 1',
    description: 'Base blockchain protocols providing security and consensus for decentralized networks.',
    href: '/Knowledge/layer-1',
    category: 'tech',
  },
  {
    title: 'Blockchain',
    description: 'Distributed ledger technology maintaining transaction records across multiple computers.',
    href: '/Knowledge/blockchain',
    category: 'tech',
  },
  {
    title: 'Rollups',
    description: 'Layer 2 solutions executing transactions off-chain while storing data on-chain.',
    href: '/Knowledge/rollups',
    category: 'tech',
  },
  {
    title: 'ZK-STARK',
    description: 'Zero-knowledge proof system with transparent setup and quantum resistance.',
    href: '/Knowledge/zk-stark',
    category: 'tech',
  },
  {
    title: 'Reentrancy Attack',
    description: 'Smart contract vulnerability where malicious code repeatedly calls back into the original contract.',
    href: '/Knowledge/Reentrancy-Attack',
    category: 'tech',
  },
  {
    title: 'ZK-SNARK',
    description: 'Zero-knowledge proof system allowing verification without revealing underlying data.',
    href: '/Knowledge/zk-snark',
    category: 'tech',
  },
  {
    title: 'Gas Optimization',
    description: 'Techniques to reduce computational costs of executing transactions on Ethereum-compatible networks.',
    href: '/Knowledge/Gas-optimization',
    category: 'tech',
  },
  {
    title: 'PoS',
    description: 'Proof of Stake consensus where validators are selected based on their cryptocurrency holdings.',
    href: '/Knowledge/pos',
    category: 'tech',
  },
  {
    title: '51% Attack',
    description: "Attack scenario where a single entity controls majority of network's mining/validation power.",
    href: '/Knowledge/51-percent-attack',
    category: 'tech',
  },
  {
    title: 'Ethereum Merge',
    description: 'Transition from Proof-of-Work to Proof-of-Stake consensus in Ethereum.',
    href: '/Knowledge/ethereum-merge',
    category: 'tech', // Categorized as tech (protocol change)
  },
  {
    title: 'Cryptography',
    description: 'Mathematical techniques for securing information and communications in blockchain systems.',
    href: '/Knowledge/cryptography',
    category: 'tech',
  },
  {
    title: 'Cross-Chain Bridge',
    description: 'Infrastructure enabling asset transfers between different blockchain networks.',
    href: '/Knowledge/Cross-Chain-Bridge',
    category: 'tech',
  },
  {
    title: 'Smart Contracts',
    description: 'Self-executing digital agreements with terms directly written into code.',
    href: '/Knowledge/smart-contracts',
    category: 'tech',
  },
  {
    title: 'EVM',
    description: 'Ethereum Virtual Machine that executes smart contracts in the Ethereum network.',
    href: '/Knowledge/evm',
    category: 'tech',
  },
  {
    title: 'Gas',
    description: 'Unit measuring computational effort required to execute operations on Ethereum.',
    href: '/Knowledge/gas',
    category: 'tech',
  },
  {
    title: 'DeFi',
    description: 'Decentralized Finance applications offering financial services without traditional intermediaries.',
    href: '/Knowledge/defi',
    category: 'other',
  },
  {
    title: 'DAO',
    description: 'Decentralized Autonomous Organization governed by code and community voting.',
    href: '/Knowledge/dao',
    category: 'other',
  },
  {
    title: 'ENS',
    description: 'Ethereum Name Service mapping human-readable names to blockchain addresses and resources.',
    href: '/Knowledge/ens',
    category: 'other',
  },
  {
    title: 'NFT',
    description: 'Non-Fungible Token representing unique digital assets with provable ownership.',
    href: '/Knowledge/nft',
    category: 'other',
  },
  {
    title: 'Ethereum', // Ethereum platform itself
    description: 'Blockchain platform enabling smart contracts and decentralized applications.',
    href: '/Learn/Ethereum-More/Introduction', 
    category: 'other', // Categorized as other (platform/ecosystem level)
  },
  {
    title: 'DPoS',
    description: 'Delegated Proof of Stake consensus where token holders elect validators to secure the network.',
    href: '/Knowledge/dpos',
    category: 'tech',
  },
  {
    title: 'PoA',
    description: 'Proof of Authority consensus relying on approved validators with known identities.',
    href: '/Knowledge/poa',
    category: 'tech',
  },
  {
    title: 'Optimistic Rollups',
    description: 'Layer 2 scaling solution assuming transactions are valid by default with fraud proof security.',
    href: '/Knowledge/optimistic-rollups',
    category: 'tech',
  },
  {
    title: 'ZK Rollups',
    description: 'Layer 2 scaling solution using zero-knowledge proofs to verify transaction validity.',
    href: '/Knowledge/zk-rollups',
    category: 'tech',
  },
  {
    title: 'ERC-20',
    description: 'Token standard for fungible tokens on Ethereum, enabling interoperability across applications.',
    href: '/Knowledge/erc20',
    category: 'tech',
  },
  {
    title: 'Bitcoin and Blockchain', // Foundational concept
    description: 'The original cryptocurrency and its underlying technology, revolutionizing digital finance.',
    href: '/Knowledge/Bitcoin-and-Blockchain-knowledge', 
    category: 'other',
  },
  // Removed: Blockchain Explorers, Gas Fee Calculation, Ethereum Applications, Ethereum Development
]; 