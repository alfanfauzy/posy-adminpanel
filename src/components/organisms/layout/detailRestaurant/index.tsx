import React from 'react'

const OrganismDetailRestaurant = () => (
  <section className="flex h-auto w-auto gap-5 rounded-md border border-gray-200 bg-white p-7 shadow-md">
    <img
      src="https://seeklogo.com/images/K/kfc-new-logo-72E6348046-seeklogo.com.png"
      className="h-24 w-24 rounded-full"
      alt="Avatar"
    />
    <div className="flex w-full flex-col gap-5">
      {/** ---- Title Section ----- */}
      <h1 className="text-xl-semibold">Kentucky Fried Chicken</h1>

      {/** --- Detail Section ----- */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-s-regular text-gray-400">Restaurant Email</h3>
            <p className="text-l-reguler">kfc@mail.com</p>
          </div>
          <div>
            <h3 className="text-s-regular text-gray-400">PIC Name</h3>
            <p className="text-l-reguler">kfc@mail.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-s-regular text-gray-400">Restaurant Phone</h3>
            <p className="text-l-reguler">0821123456789</p>
          </div>
          <div>
            <h3 className="text-s-regular text-gray-400">PIC Email</h3>
            <p className="text-l-reguler">pic@mail.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-s-regular text-gray-400">NPWP</h3>
            <img
              src="https://seeklogo.com/images/K/kfc-new-logo-72E6348046-seeklogo.com.png"
              className="h-10 w-10"
              alt="Thumbnail NPWP"
            />
          </div>
          <div>
            <h3 className="text-s-regular text-gray-400">PIC Phone</h3>
            <p className="text-l-reguler">08123456789</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-s-regular text-gray-400">NIB</h3>
            <img
              src="https://seeklogo.com/images/K/kfc-new-logo-72E6348046-seeklogo.com.png"
              className="h-10 w-10"
              alt="Thumbnail NIB"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default OrganismDetailRestaurant
