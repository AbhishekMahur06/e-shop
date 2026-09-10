import { useContext } from "react";
import myContext from "../../context/data/myContext";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Verified Customer",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    rating: 5,
    review:
      "I am really happy with the quality of the products. The product looked exactly like the pictures and the delivery was quick. I will definitely shop here again.",
  },
  {
    name: "Priya Verma",
    role: "Verified Customer",
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    rating: 5,
    review:
      "Great shopping experience from start to finish. The website is easy to use, the prices are reasonable, and my order arrived safely and on time.",
  },
  {
    name: "Aman Gupta",
    role: "Verified Customer",
    image: "https://cdn-icons-png.flaticon.com/512/924/924874.png",
    rating: 4,
    review:
      "The product quality was better than I expected for the price. Customer service was helpful and the overall ordering process was smooth.",
  },
];

function Testimonial() {
  const { mode } = useContext(myContext);
  const isDark = mode === "dark";

  return (
    <section>
      <div className="container mx-auto px-5 py-10">
        <h1
          className="text-center text-3xl font-bold text-black"
          style={{ color: isDark ? "white" : "" }}
        >
          Testimonials
        </h1>

        <h2
          className="text-center text-2xl font-semibold mb-10"
          style={{ color: isDark ? "white" : "" }}
        >
          What our <span className="text-pink-500">customers</span> are saying
        </h2>

        <div className="flex flex-wrap -m-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div
                className="h-full text-center rounded-xl p-6 shadow-md border border-gray-200 transition duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: isDark ? "rgb(46 49 55)" : "#f9fafb",
                }}
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                />

                <div
                  className="mb-4 text-lg"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>

                <p
                  className="leading-relaxed"
                  style={{ color: isDark ? "white" : "#4b5563" }}
                >
                  "{testimonial.review}"
                </p>

                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />

                <h2
                  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
                  style={{ color: isDark ? "#ff4162" : "" }}
                >
                  {testimonial.name}
                </h2>

                <p
                  className="text-gray-500"
                  style={{ color: isDark ? "white" : "" }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
