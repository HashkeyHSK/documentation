'use client';

import { FC, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Import from shared data file
import { knowledgeItems, generateId, KnowledgeItemData } from '@/lib/knowledge-data';
// Import the new custom TOC component
import KnowledgeToc from '@/components/knowledge-toc';

interface KnowledgeCardProps {
  title: string;
  description: string;
  href: string;
  id: string; 
}

const KnowledgeCard: FC<KnowledgeCardProps> = ({ title, description, href, id }) => {
  const router = useRouter();
  return (
    // Ensure card has the ID
    <div 
      id={id}
      onClick={() => router.push(href)}
      className="group rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border-0 dark:border dark:border-neutral-800 hover:shadow-md dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg cursor-pointer scroll-mt-28"
    >
      <div className="bg-[#CBC3E3] dark:bg-gradient-to-r dark:from-[#2a173b] dark:to-[#3f2c5f] px-4">
        <div className="flex items-center space-x-2">
          <p className="text-base font-medium text-neutral-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">
            {title}
          </p>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Knowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredItems = knowledgeItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simplified navigation logic using the href from data
  const handleNavigate = (href: string) => {
     router.push(href); 
  };

  return (
    // Use flex layout to position main content and custom TOC
    <div className="flex items-start gap-8 w-full">
      {/* Main content area (cards grid) */}
      <div className="flex-grow pb-10">
        <div className="relative mb-6">
           {/* Search input */}
           <div className="relative">
            <input
              type="text"
              placeholder="Search knowledge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BEF] dark:focus:ring-[#3f2c5f] focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
          </div>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
            No results found for "{searchTerm}"
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item, index) => {
              const id = generateId(item.title); 
              // Construct the correct href for card click navigation
              const docHref = item.href.startsWith('/Learn/') ? `/docs${item.href}` : `/docs/Knowledge/${item.href.split('/').pop()}`; 
              return (
                <KnowledgeCard
                  key={index}
                  id={id} 
                  title={item.title}
                  description={item.description}
                  href={docHref} 
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Render the custom KnowledgeToc component on the right */}
      <KnowledgeToc />
    </div>
  );
};

export default Knowledge; 