export default function UnsplashImages({
  images,
  selected,
  setSelected,
  Cdn_URL,
  selectedStore,
}) {
  // Helper function to check if an image is selected
  const isImageSelected = (image) => selected.includes(image)

  // Function to toggle selection of an image
  const toggleImageSelection = (image) => {
    if (isImageSelected(image)) {
      setSelected(selected.filter((selectedImage) => selectedImage !== image))
    } else {
      setSelected([...selected, image])
    }
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {images.map((image) => (
        <li
          key={image.id}
          className={"relative"}
          onClick={() => toggleImageSelection(image)}
        >
          <div
            className={
              isImageSelected(image)
                ? "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 ring-4 ring-kolas ring-opacity-80 ring-offset-2 ring-offset-gray-100"
                : "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100"
            }
          >
            <picture>
              <img
                src={`${Cdn_URL}${selectedStore}/${image.name}`}
                alt="content"
                className="object-cover pointer-events-none group-hover:opacity-75 w-full h-24"
              />
            </picture>
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            ></button>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-xs font-medium text-black">
            {image.name}
          </p>{" "}
        </li>
      ))}
    </ul>
  )
}
