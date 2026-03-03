"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Link } from "@heroui/link";
import React from "react";
import { button as buttonStyles } from "@heroui/theme";
import { GithubIcon } from "@/components/icons";
import useHook from "./useHook";
import { Eye, EyeOff } from "@deemlol/next-icons";

export default function page({ isOpen, onClose, LoginRef }) {
  const { isVisible, toggleVisibility } = useHook();
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
        <ModalContent ref={LoginRef}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 px-12 pt-8">
                <h1 className="text-xl font-semibold">Login</h1>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4 px-6">
                  <Input size="sm" label="ID CARD" variant="flat" />
                  <Input
                    size="sm"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <Eye size={20} className="text-default-500" />
                        ) : (
                          <EyeOff size={20} className="text-default-500" />
                        )}
                      </button>
                    }
                    label="PASSWORD"
                    variant="flat"
                    type={isVisible ? "text" : "password"}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Link
                  isExternal
                  className={buttonStyles({
                    color: "default",
                    radius: "full",
                    variant: "faded",
                  })}
                  href="/form"
                ></Link>
                <Link isExternal href="/consent_form_radiotherapy">
                  <GithubIcon size={20} />
                  GitHub
                </Link>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" variant="flat">
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
