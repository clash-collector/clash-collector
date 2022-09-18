import { CheckCircleIcon } from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import React from "react";
import View from "../../components/View";
import useNetwork from "../../hooks/useNetwork";
import useRisk from "../../hooks/useRisk";

export default function Settings() {
  const { name, networks, changeNetwork } = useNetwork();
  const { risk, setRisk } = useRisk();

  return (
    <View>
      <div className="card relative h-screen">
        <div className="card-body">
          <h1 className="card-title font-bold">Settings</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 text-start my-auto">Network</div>
            <div>
              <Popover>
                <Popover.Button>
                  <div className="btn">{name}</div>
                </Popover.Button>

                <Popover.Panel className="absolute card p-2 shadow-xl bg-base-200 rounded-box h-min">
                  {networks.map((e) => (
                    <div
                      key={e.name}
                      onClick={() => changeNetwork(e.name)}
                      className={`justify-start p-2 rounded-md hover:bg-base-300`}
                    >
                      <div className="flex flex-row justify-between">
                        <div>{e.name}</div>
                        <div className="my-auto">{e.name === name && <CheckCircleIcon className="w-5 h-5" />}</div>
                      </div>
                    </div>
                  ))}
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          {/* <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 text-start my-auto">Experimental mode</div>
            <div>
              <input type="checkbox" className="toggle" checked={risk} onChange={() => setRisk(!risk)} />
            </div>
          </div> */}
        </div>
      </div>
    </View>
  );
}
