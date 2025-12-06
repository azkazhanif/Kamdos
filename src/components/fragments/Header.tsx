import Button from "../ui/Button";
import ViewSwitcher from "../ui/ViewSwitcher";
import SearchBar from "../ui/SearchBar";
import Logo from "../ui/Logo";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-20 shrink-0">
      <Logo text />

      <div className="flex items-center gap-4">
        <SearchBar />
        <ViewSwitcher />
        <Button>New Task</Button>
      </div>
    </header>
  );
};

export default Header;
