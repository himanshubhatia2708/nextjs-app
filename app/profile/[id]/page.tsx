export function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
type Props = {
    params: Promise<{ id: string }>
}
export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <>
            Profile: {id}</>
    )
}