import { SIGN_LIST, AVAILABLE_TAGS } from "~/utils/signList";

export default function Bank() {
  console.log(AVAILABLE_TAGS);

  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center gap-4 p-8">
      <h2 className="text-5xl">Bank</h2>

      <p>TAGS: {AVAILABLE_TAGS.join(", ").toString()}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {SIGN_LIST.map((sign) => {
          return (
            <button key={sign.id} className="btn">
              <span>{sign.name}</span>
              {sign.tags && <span>*</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
