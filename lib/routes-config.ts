// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
  isSeparator?: boolean; // 添加分隔线属性
  collapsible?: boolean; // 控制菜单项是否可折叠
  externalLink?: boolean; // 外部链接标记
};

export const ROUTES: EachRoute[] = [
  {
    title: "About HashKey Chain",
    href: "/About-HashKey-Chain",
    isSeparator: true,
  },
  {
    title: "Developer QuickStart",
    href: "/Developer-QuickStart",
    isSeparator: true,  
  },
  {
    title: "Build on HashKey Chain",
    href: "/Build-on-HashKey-Chain",
    noLink: true,
    isSeparator: true, 
    items: [
      { title: "Network Info", href: "/network-info" },
      { title: "Tools", href: "/Tools", noLink: true,
        items: [
          { title: "Explorer", href: "/Explorer" },
          { title: "Wallets", href: "/Wallet" },
          { title: "Faucet", href: "/Faucet" },
          { title: "Safe", href: "/Safe" },
          { title: "Oracle", href: "/Oracle" },
          { title: "Bridges", href: "/Bridges" },
          { title: "KYC", href: "/KYC" },
          { title: "Subgraph", href: "/Subgraph" },
        ],
      },
      { title: "Fee", href: "/Fee" },
      { title: "RPC & Node Provider", href: "/RPC-Node-Provider" },
    ],
  },{
    title: "Learn",
    href: "/Learn",
    noLink: true,
    isSeparator: true,
    items: [
      { title: "Welcome", href: "/Welcome" },
      { title: "Bitcoin-and-Blockchain", href: "/Bitcoin-and-Blockchain" },
      { title: "Ethereum-More", href: "/Ethereum-More", noLink: true,
        items: [
          { title: "Introduction", href: "/Introduction" },
          { title: "Ethereum-Technology", href: "/Ethereum-Technology" },
          { title: "Ethereum-Applications", href: "/Ethereum-Applications" },
          { title: "Gas-Fee-Calculation", href: "/Gas-Fee-Calculation" },
          { title: "Explorer-Wallet", href: "/Explorer-Wallet" },
        ]
      },
    ],
  },
  {
    title: "Knowledge",
    href: "/Knowledge",
  },
  {
    title: "Feedback",
    href: "/Feedback",
    noLink: true,
    items: [
      { 
        title: "Get help", 
        href: "https://discord.com/invite/V7kypNm9cS",
        externalLink: true
      },
      { 
        title: "Apply for Grants", 
        href: "https://github.com/orgs/HashkeyHSK/discussions/categories/session-1",
        externalLink: true
      },
      {
        title: "Bug bounty",
        href: "https://github.com/orgs/HashkeyHSK/discussions/categories/bug-bounty",
        externalLink: true,
      },
    ],
  },
];

type Page = { 
  title: string; 
  href: string; 
  externalLink?: boolean; 
};

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  // 只有当不是noLink和外部链接时才添加该项（移除对isSeparator的检查）
  if (!node.noLink && !node.externalLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    // 如果是外部链接，不修改href
    const href = subNode.externalLink ? subNode.href : `${node.href}${subNode.href}`;
    const temp = { ...subNode, href };
    // 将所有子节点添加到结果中，并传递externalLink属性
    const childLinks = getRecurrsiveAllLinks(temp);
    // 如果是外部链接，确保标记externalLink属性
    if (subNode.externalLink) {
      childLinks.forEach(link => {
        link.externalLink = true;
      });
    }
    ans.push(...childLinks);
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
