import SearchBar from "../search-bar/search-bar";


function NavBar() {

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src="/aircastle.svg" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex">
                <SearchBar />
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;