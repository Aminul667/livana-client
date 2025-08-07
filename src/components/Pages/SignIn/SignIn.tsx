"use client";

import { LivanaForm } from "@/components/Shared/Form/LivanaForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserLogin } from "@/hooks/auth.hooks";
import { signInSchema, TSignInFormValues } from "@/schema/auth.schema";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const { mutate: handleUseUserLogin, isPending } = useUserLogin({
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = (data: TSignInFormValues) => {
    handleUseUserLogin(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">Livana</h1>
          <p className="text-[#819067]">Welcome back to your rental journey</p>
        </div>

        <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-[#0A400C]">
              Sign In
            </CardTitle>
            <p className="text-[#819067] text-sm mt-2">
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <LivanaForm<TSignInFormValues>
              schema={signInSchema}
              onSubmit={onSubmit}
              className="space-y-4"
            >
              {({ register, formState: { errors } }) => (
                <>
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[#0A400C] block"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                      <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C] placeholder:text-[#819067]/60"
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-red-500 mt-1">
                        {(errors.email as { message?: string })?.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[#0A400C] block"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                      <Input
                        {...register("password")}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C] placeholder:text-[#819067]/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#819067] hover:text-[#0A400C] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors?.password && (
                      <p className="text-red-500 mt-1">
                        {(errors.password as { message?: string })?.message}
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#819067] border-[#B1AB86] rounded focus:ring-[#819067]/20"
                      />
                      <span className="text-[#819067]">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[#819067] hover:text-[#0A400C] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#819067] hover:bg-[#0A400C] text-white font-semibold py-3 transition-all duration-300 transform cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </>
              )}
            </LivanaForm>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#B1AB86]/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#819067]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-[#B1AB86]/30 text-[#819067] hover:bg-[#B1AB86]/10 hover:border-[#819067]/50 bg-transparent"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="border-[#B1AB86]/30 text-[#819067] hover:bg-[#B1AB86]/10 hover:border-[#819067]/50 bg-transparent"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-[#819067]">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                href="/sign-up"
                className="text-[#0A400C] font-semibold hover:text-[#819067] transition-colors"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-[#819067]">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-[#0A400C] transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-[#0A400C] transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
