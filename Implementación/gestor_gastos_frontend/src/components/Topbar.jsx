export default function Topbar({ button }) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-8 py-4 sticky top-0 z-10 ml-60">
      <div />
      {button.text && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={button.onClick}
        >
          {button.text}
        </button>
      )}
    </header>
  );
}
