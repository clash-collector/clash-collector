import React from "react";
import { Link } from "react-router-dom";
import { Collection } from "../../constants/collections";

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <div key={collection.id} className="rounded-2xl border-2 m-5 shadow-lg min-w-min w-48 h-auto">
      <div>
        <img src={collection.profile} alt="Profile picture" className="rounded-t-2xl" />
      </div>
      <div className="p-3 text-center">
        <span className="text-2xl font-bold">{collection.name}</span>
        <Link to={`/collection/${collection.id}`}>
          <button className="btn btn-lg btn-primary mt-2">View battlegrounds</button>
        </Link>
      </div>
    </div>
  );
}
