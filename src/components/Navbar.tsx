import { ClipboardCopyIcon, DatabaseIcon, MenuIcon, SupportIcon, ViewListIcon, XIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { APP_NAME } from "../constants";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import logo from "../assets/logo.svg";

const battlegroundActions = [
  {
    name: "My NFTs",
    description:
      "View and manage your NFTs, send them to an open battleground, take actions in ones you're engaged in.",
    href: "#/nfts",
    icon: ClipboardCopyIcon,
  },
  {
    name: "Browse collections",
    description: "Look for battlegrounds of a specific collection.",
    href: "#/",
    icon: ViewListIcon,
  },
];
const resources = [
  {
    name: "Docs",
    description: "Official Documentation",
    href: "#/docs",
    icon: DatabaseIcon,
  },
  {
    name: "Github",
    description: "Repository containing the source code of the frontend and contracts",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Discord",
    href: "#",
    icon: SupportIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Logo({ text }: { text?: boolean }) {
  return (
    <a href="#">
      <div className="flex flex-row justify-center space-x-2">
        <img className="h-10 w-auto" src={logo} alt="" />
        {text && <span className="text-lg my-auto font-bold">{APP_NAME}</span>}
      </div>
    </a>
  );
}

function Mobile() {
  return (
    <div className="drawer absolute">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-min">
        <div className="flex justify-between p-2 border-b">
          <Logo />
          <label
            htmlFor="nav-drawer"
            className="btn-outline rounded-md p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <div className="relative rounded-lg shadow-lg ring-opacity-5 bg-base-100 divide-y">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <Logo text />
              <div className="-mr-2">
                <label
                  htmlFor="nav-drawer"
                  className="btn btn-outline rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset"
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </label>
              </div>
            </div>
            <div className="mt-6">
              <div className="grid gap-y-2">
                {battlegroundActions.map((item) => (
                  <a key={item.name} href={item.href}>
                    <div className="flex flex-row p-2 text-primary-content rounded-box bg-primary hover:bg-primary-focus">
                      <item.icon className="flex-shrink-0 h-6 w-6 my-auto" aria-hidden="true" />
                      <div className="ml-3 font-medium my-auto">{item.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div className="grid gap-y-2">
              {resources.map((item) => (
                <a key={item.name} href={item.href}>
                  <div className="flex flex-row p-2 text-primary-content rounded-box bg-primary hover:bg-primary-focus">
                    <item.icon className="my-auto w-5 h-5" aria-hidden="true" />
                    <div className="my-auto">{item.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <WalletMultiButton className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="w-100">
      <div className="md:hidden">
        <Mobile />
      </div>
      <div className="hidden md:flex space-x-10">
        <div className="flex w-full justify-between items-center border-b py-3 bg-primary-200 md:justify-start md:space-x-10 px-4 sm:px-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Logo />
          </div>
          <Popover className="relative text-lg">
            {({ open }: { open: boolean }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open ? "bg-base-200" : "",
                    "p-3 group rounded-md inline-flex items-center font-medium hover:bg-base-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-300"
                  )}
                >
                  <span className="">Battlegrounds</span>
                  <ChevronDownIcon className={"ml-2 h-5 w-5"} aria-hidden="true" />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="bg-base-100 border rounded-box absolute z-10 -ml-4 mt-2 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                        {battlegroundActions.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-base-200"
                          >
                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-primary">{item.name}</p>
                              <p className="mt-1 text-sm">{item.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <Link to="/docs" className="p-3 text-xl font-medium">
            Docs
          </Link>
          <Link to="/settings" className="p-3 text-xl font-medium">
            Settings
          </Link>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <WalletMultiButton className="bg-indigo-500 dark:bg-indigo-500 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
