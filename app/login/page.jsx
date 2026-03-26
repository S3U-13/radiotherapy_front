"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import useHook from "./useHook";
import { Eye, EyeOff } from "@deemlol/next-icons";
import Link from "next/link";

export default function page({ isOpen, onClose, LoginRef }) {
  const { isVisible, toggleVisibility } = useHook();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="md"
      backdrop="blur"
      placement="center"
      classNames={{
        base: "bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl dark:shadow-zinc-950/50",
        backdrop: "bg-black/50 backdrop-blur-md",
        closeButton: "hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700 top-4 right-4 text-gray-400 absolute transition-colors",
      }}
    >
      <ModalContent ref={LoginRef}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2 px-8 pt-10 pb-2">
              <h1 className="text-2xl font-semibold tracking-tight text-[#111827] dark:text-zinc-100">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400 font-normal">
                Please enter your details to sign in.
              </p>
            </ModalHeader>
            <ModalBody className="px-8 py-2">
              <div className="space-y-10">
                <Input
                  size="lg"
                  label="USERNAME"
                  labelPlacement="outside"
                  placeholder="Enter your Username"
                  variant="bordered"
                  classNames={{
                    inputWrapper: "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-500 focus-within:!border-[#111827] dark:focus-within:!border-zinc-300 focus-within:!ring-1 focus-within:!ring-[#111827] dark:focus-within:!ring-zinc-300 transition-all rounded-xl shadow-sm",
                    label: "text-gray-700 dark:text-zinc-300 font-semibold text-xs tracking-wider",
                    input: "text-gray-900 dark:text-zinc-100 text-base"
                  }}
                />
                <Input
                  size="lg"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Eye size={20} className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors" />
                      ) : (
                        <EyeOff size={20} className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors" />
                      )}
                    </button>
                  }
                  label="PASSWORD"
                  variant="bordered"
                  type={isVisible ? "text" : "password"}
                  classNames={{
                    inputWrapper: "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-gray-300 dark:hover:border-zinc-500 focus-within:!border-[#111827] dark:focus-within:!border-zinc-300 focus-within:!ring-1 focus-within:!ring-[#111827] dark:focus-within:!ring-zinc-300 transition-all rounded-xl shadow-sm",
                    label: "text-gray-700 dark:text-zinc-300 font-semibold text-xs tracking-wider",
                    input: "text-gray-900 dark:text-zinc-100 text-base"
                  }}
                />
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-medium text-gray-500 dark:text-zinc-400 hover:text-[#111827] dark:hover:text-zinc-200 transition-colors">
                  Forgot password?
                </a>
              </div>
            </ModalBody>
            <ModalFooter className="px-8 flex-col gap-3">
              <Button
                className="w-full bg-[#111827] dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-xl shadow-md min-h-[46px] text-base hover:bg-black dark:hover:bg-white transition-all hover:shadow-lg"
                onPress={onClose}
                as={Link}
                href="/consent_form_radiotherapy"
              >
                Sign In
              </Button>
              <Button
                variant="light"
                className="w-full font-medium text-gray-500 dark:text-zinc-400 rounded-xl min-h-[46px] text-base hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
                onPress={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
