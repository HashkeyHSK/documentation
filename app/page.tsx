import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { Leftbar } from "@/components/leftbar";
import { Typography } from "@/components/typography";
import { getDocsForSlug } from "@/lib/markdown";

export default async function Home() {
  // 使用固定路径获取文档内容
  const pathName = "About-HashKey-Chain";
  const slug = pathName.split('/');
  const res = await getDocsForSlug(pathName);

  if (!res) {
    return <div>Documentation not found</div>;
  }

  return (
    <div className="flex items-start gap-8">
      <Leftbar key="leftbar" />
      <div className="flex-[5.25]">
        <div className="flex items-start gap-10">
          <div className="flex-[4.5] py-10">
            <DocsBreadcrumb paths={slug} />
            <Typography>
              <h1 className="sm:text-3xl text-2xl !-mt-0.5">
                {res.frontmatter.title}
              </h1>
              <p className="-mt-4 text-muted-foreground sm:text-[16.5px] text-[14.5px]">
                {res.frontmatter.description}
              </p>
              <div>{res.content}</div>
              <Pagination pathname={pathName} />
            </Typography>
          </div>
          <Toc path={pathName} />
        </div>
      </div>
    </div>
  );
}
