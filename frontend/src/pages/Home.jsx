import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
export function Home() {
    return (
        <>
            <NavBar pageType={"home"}/>
            <div className="mt-[17%]">
                <SearchBar />
            </div>
        </>
    );
}
