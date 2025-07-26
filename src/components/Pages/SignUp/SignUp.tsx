"use client";

import { LivanaForm } from "@/components/Shared/Form/LivanaForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpSchema, TSignUpFormValues } from "@/schema/auth.schema";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: TSignUpFormValues) => {
    console.log("Login data", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">Livana</h1>
          <p className="text-[#819067]">Start your rental journey today</p>
        </div>

        <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-[#0A400C]">
              Create Account
            </CardTitle>
            <p className="text-[#819067] text-sm mt-2">
              Join thousands of happy users on Livana
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <LivanaForm<TSignUpFormValues>
              schema={signUpSchema}
              // defaultValues={{ role: "" }}
              onSubmit={onSubmit}
              className="space-y-4"
            >
              {({ control, register, formState: { errors } }) => (
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

                  {/* user role */}
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label
                          htmlFor="userType"
                          className="text-sm font-medium text-[#0A400C] block"
                        >
                          I am a
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4 z-10" />
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C]">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-[#B1AB86]/30">
                              <SelectItem
                                value="tenant"
                                className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                              >
                                Tenant
                              </SelectItem>
                              <SelectItem
                                value="landlord"
                                className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                              >
                                Landlord
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.role && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.role.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* Terms and Conditions */}
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-4 h-4 text-[#819067] accent-[#819067] border-[#B1AB86] rounded focus:ring-[#819067]/20 mt-0.5"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-[#819067] leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-[#0A400C] hover:text-[#819067] underline transition-colors"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-[#0A400C] hover:text-[#819067] underline transition-colors"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    )}
                  />
                  {errors.terms && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.terms.message}
                    </p>
                  )}

                  {/* Sign Up Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#819067] hover:bg-[#0A400C] text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    Create Account
                  </Button>
                </>
              )}
            </LivanaForm>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-[#819067]">Already have an account? </span>
              <Link
                href="/sign-in"
                className="text-[#0A400C] font-semibold hover:text-[#819067] transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-[#819067]">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#819067] rounded-full"></div>
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#819067] rounded-full"></div>
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#819067] rounded-full"></div>
              <span>Secure platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
