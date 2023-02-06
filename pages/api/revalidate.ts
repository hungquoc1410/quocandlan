export default async function handler(
    req: { query: { secret: string | undefined; path: any } },
    res: {
        status: (arg0: number) => {
            (): any
            new (): any
            json: { (arg0: { message: string }): any; new (): any }
            send: { (arg0: string): any; new (): any }
        }
        revalidate: (arg0: any) => any
        json: (arg0: { revalidated: boolean }) => any
    }
) {
    if (req.query.secret !== process.env.NEXT_REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        await res.revalidate(req.query.path)
        return res.json({
            revalidated: true,
        })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}
