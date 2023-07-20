import { IndianRupee, Truck, Heart } from "lucide-react";

export default function FourthSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
      <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-3 sm:gap-12 lg:grid-cols-3">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <IndianRupee className="h-9 w-9 text-gray-700" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Budget Friendly
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Customize your shoes at budget friendly price
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Truck className="h-9 w-9 text-gray-700" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Shipment within 15 days
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Your shoes reach within 15 days at your doorstep. Fast and easy.
          </p>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Heart className="h-9 w-9 text-gray-700" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Made in India
          </h3>
          <p className="mt-4 text-sm text-gray-600">
            Your shoe is 100% made and customized in India.
          </p>
        </div>
      </div>
    </div>
  );
}
