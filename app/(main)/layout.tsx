import Header from '@/components/Header';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="relative pt-6">
                {children}
            </div>
        </>
    );
}
