import FooterCompact from "@/components/auth/common/footer-compact";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo/logo-header.png"
              alt={(process.env.NEXT_PUBLIC_COMPANY_NAME || "Logo") + " Logo"}
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </span>
          </Link>
        </div>

        {/* Page Content */}
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <FooterCompact />
    </div>
  );
}
