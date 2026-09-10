import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../fireabase/FirebaseConfig";

export default function Modal({
  name,
  address,
  pincode,
  phoneNumber,
  setName,
  setAddress,
  setPincode,
  setPhoneNumber,
  buyNow,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };

  const openModal = () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    setIsOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name?.trim() || "";
    const trimmedAddress = address?.trim() || "";
    const trimmedPincode = pincode?.trim() || "";
    const trimmedPhone = phoneNumber?.trim() || "";

    if (!trimmedName || !trimmedAddress || !trimmedPincode || !trimmedPhone) {
      return;
    }

    if (!/^\d{6}$/.test(trimmedPincode)) {
      return;
    }

    if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      return;
    }

    try {
      setIsSubmitting(true);

      const success = await buyNow();

      if (success !== false) {
        setIsOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center rounded-lg text-white font-bold">
        <button
          type="button"
          onClick={openModal}
          className="w-full bg-violet-600 py-2 text-center rounded-lg text-white font-bold hover:bg-violet-700"
        >
          Buy Now
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-2 text-left align-middle shadow-xl transition-all">
                  <div className="p-6">
                    <Dialog.Title
                      as="h2"
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Delivery Details
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Enter Full Name
                        </label>

                        <input
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          required
                          className="border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100 focus:ring-2 focus:ring-violet-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Enter Full Address
                        </label>

                        <textarea
                          value={address || ""}
                          onChange={(e) => setAddress(e.target.value)}
                          name="address"
                          id="address"
                          rows="3"
                          autoComplete="street-address"
                          required
                          className="border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100 focus:ring-2 focus:ring-violet-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="pincode"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Enter Pincode
                        </label>

                        <input
                          value={pincode || ""}
                          onChange={(e) => setPincode(e.target.value)}
                          type="text"
                          name="pincode"
                          id="pincode"
                          inputMode="numeric"
                          maxLength="6"
                          pattern="[0-9]{6}"
                          autoComplete="postal-code"
                          required
                          className="border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100 focus:ring-2 focus:ring-violet-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="mobileNumber"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Enter Mobile Number
                        </label>

                        <input
                          value={phoneNumber || ""}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="tel"
                          name="mobileNumber"
                          id="mobileNumber"
                          inputMode="numeric"
                          maxLength="10"
                          pattern="[6-9][0-9]{9}"
                          autoComplete="tel"
                          required
                          className="border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-100 focus:ring-2 focus:ring-violet-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white outline-0 hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? "Processing..." : "Order Now"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
