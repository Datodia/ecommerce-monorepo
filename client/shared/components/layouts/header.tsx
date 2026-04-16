"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { logout } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/auth-store-provider";
import { CartSheet } from "@/features/cart/components/cart-sheet";
import { Button } from "@/shared/components/ui/button";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/products", label: "Products" },
	{ href: "/categories", label: "Categories" },
];

export function Header() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const userMenuRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);

	const closeMenu = () => setIsOpen(false);
	const closeUserMenu = () => setIsUserMenuOpen(false);
	const userInitial = user?.fullName?.trim().charAt(0).toUpperCase() ?? "U";

	const handleLogout = () => {
		logout();
		setUser(null);
		setError(null);
		closeMenu();
		router.push("/");
	};

	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = "";
			return;
		}

		document.body.style.overflow = "hidden";
		const onEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeMenu();
			}
		};

		window.addEventListener("keydown", onEscape);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onEscape);
		};
	}, [isOpen]);

	useEffect(() => {
		const onPointerDown = (event: MouseEvent) => {
			if (!userMenuRef.current?.contains(event.target as Node)) {
				closeUserMenu();
			}
		};

		window.addEventListener("mousedown", onPointerDown);
		return () => window.removeEventListener("mousedown", onPointerDown);
	}, []);

	return (
		<>
			<header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link href="/" className="font-heading text-lg font-semibold">
						Ecommerce
					</Link>

					<nav className="hidden items-center gap-6 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-2 md:flex">
						<CartSheet />
						{user ? (
							<div className="relative" ref={userMenuRef}>
								<Button
									type="button"
									variant="outline"
									className="flex items-center gap-2 rounded-full px-2 py-1"
									onClick={() => setIsUserMenuOpen((prev) => !prev)}
								>
									<div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
										{userInitial}
									</div>
									<span className="text-sm font-medium text-foreground">{user.fullName}</span>
								</Button>

								{isUserMenuOpen ? (
									<div className="absolute right-0 top-[calc(100%+0.5rem)] w-48 rounded-lg border bg-background p-2 shadow-lg">
										<Link
											href="/orders"
											onClick={closeUserMenu}
											className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
										>
											Orders
										</Link>
										<button
											type="button"
											onClick={handleLogout}
											className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted"
										>
											Logout
										</button>
									</div>
								) : null}
							</div>
						) : (
							<>
								<Button asChild variant="ghost">
									<Link href="/sign-in">Sign in</Link>
								</Button>
								<Button asChild>
									<Link href="/sign-up">Sign up</Link>
								</Button>
							</>
						)}
					</div>

					<div className="flex items-center gap-1 md:hidden">
						<CartSheet />
						<Button
							variant="ghost"
							size="icon"
							aria-label="Open navigation menu"
							onClick={() => setIsOpen(true)}
						>
							<Menu />
						</Button>
					</div>
				</div>
			</header>

			<div
				className={`fixed inset-0 z-90 bg-black/75 transition-opacity duration-200 md:hidden ${
					isOpen ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
				onClick={closeMenu}
			/>

			<aside
				className={`fixed top-0 right-0 z-100 flex h-full w-[82%] max-w-sm flex-col border-l bg-background shadow-2xl transition-transform duration-300 md:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between px-5 py-4">
					<p className="font-heading text-base font-semibold">Menu</p>
					<Button
						variant="ghost"
						size="icon-sm"
						aria-label="Close navigation menu"
						onClick={closeMenu}
					>
						<X />
					</Button>
				</div>

				<nav className="mx-4 mt-2 flex flex-col gap-1 rounded-xl p-3">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={closeMenu}
							className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/70"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="mx-4 mt-auto mb-4 space-y-2 border-t pt-4">
					{user ? (
						<>
								<div className="space-y-2">
									<Link
										href="/orders"
										onClick={closeMenu}
										className="block rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/70"
									>
										Orders
									</Link>
									<Button variant="outline" className="w-full" onClick={handleLogout}>
										Logout
									</Button>
								</div>
						</>
					) : (
						<>
							<Button asChild variant="outline" className="w-full" onClick={closeMenu}>
								<Link href="/sign-in">Sign in</Link>
							</Button>
							<Button asChild className="w-full" onClick={closeMenu}>
								<Link href="/sign-up">Sign up</Link>
							</Button>
						</>
					)}
				</div>
			</aside>
		</>
	);
}

export default Header;
