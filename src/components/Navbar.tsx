import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChartBarIcon, MenuIcon, SupportIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { APP_NAME } from "../constants";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const battlegroundActions = [
  {
    name: "My NFTs",
    description:
      "View and manage your NFTs, send them to an open battleground, take actions in ones you're engaged in.",
    href: "#/nfts",
    icon: ChartBarIcon,
  },
  {
    name: "Find a collection",
    description: "Look for a battleground that one of your token can participate in.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Create a battleground",
    description: "Create a new permanent battleground for a given collection.",
    href: "#",
    icon: ChartBarIcon,
  },
];
const resources = [
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

export default function Navbar() {
  return (
    <Popover className="relative">
      <div className="w-100">
        <div className="flex justify-between items-center border-b-2 py-3 md:justify-start md:space-x-10 px-4 sm:px-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <div className="flex flex-row justify-center space-x-2">
                <img className="h-4 w-auto sm:h-10" src={logo} alt="" />
                <span className="text-lg my-auto font-bold invisible md:visible">{APP_NAME}</span>
              </div>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative text-lg">
              {({ open }: { open: boolean }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-gray-900 bg-brand-100" : "text-gray-500",
                      "p-3 group rounded-md inline-flex items-center font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    )}
                  >
                    <span className="">Battlegrounds</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
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
                    <Popover.Panel className="bg-base-100 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
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
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
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
            <Link to="/docs" className="p-3 text-xl font-medium text-gray-500 hover:text-gray-900">
              Docs
            </Link>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <WalletMultiButton className="bg-indigo-500 dark:bg-indigo-500 rounded-xl" />
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-row space-x-2">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt={APP_NAME}
                  />
                  <span className="text-xl my-auto font-bold">{APP_NAME}</span>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {battlegroundActions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Docs
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <WalletMultiButton className="bg-indigo-500 dark:bg-indigo-500 rounded-xl" />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
