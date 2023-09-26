export default function UnsplashImages({
  images,
  selected,
  setSelected,
  Cdn_URL,
  selectedStore,
}) {
  // Function to check if an item is selected
  const isItemSelected = (item) => selected.includes(item)

  // Function to toggle selection of an item
  const toggleItemSelection = (item) => {
    if (isItemSelected(item)) {
      setSelected(selected.filter((selectedItem) => selectedItem !== item))
    } else {
      setSelected([...selected, item])
    }
  }


  

  const Cdn_Videos_Url = "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/videos/"

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {images.map((item, index) => (
        <li
          key={item.id}
          className={"relative"}
          onClick={() => toggleItemSelection(item)}
        >
          {item.name.endsWith(".mp4") ? (
            <div
              className={
                isItemSelected(item)
                  ? "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 ring-4 ring-kolas ring-opacity-80 ring-offset-2 ring-offset-gray-100 selected-item"
                  : "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100"
              }
            >
              <video
                src={`${Cdn_Videos_Url}${selectedStore}/${item.name}`}
                alt="video"
                className="object-cover pointer-events-none w-full h-24"
              />
              {isItemSelected(item) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white bg-kolas rounded-full px-2 py-1 text-xs">
                    {selected.indexOf(item) + 1}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div
              className={
                isItemSelected(item)
                  ? "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 ring-4 ring-kolas ring-opacity-80 ring-offset-2 ring-offset-gray-100 selected-item"
                  : "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100"
              }
            >
              <picture>
                <img
                  src={`${Cdn_URL}${selectedStore}/${item.name}`}
                  alt="image"
                  className="object-cover pointer-events-none w-full h-24"
                />
              </picture>
              {isItemSelected(item) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white bg-kolas rounded-full px-2 py-1 text-xs">
                    {selected.indexOf(item) + 1}
                  </span>
                </div>
              )}
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              ></button>
            </div>
          )}
          <p className="pointer-events-none mt-2 block truncate text-xs font-medium text-black">
            {item.name}
          </p>
        </li>
      ))}
    </ul>
  )
}
