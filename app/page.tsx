import FilePage from "./ui/components/filePage";

export default async function Home(props: {
  searchParams?: Promise<{
    handler?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const h = searchParams?.handler;

  
  return (
    <>
    <FilePage handler={h} />
    </>

  );
}
