import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function Carousel({ products }) {
  const featured = products.slice(0, 6)

  return (
    <div className="carousel-container">
      <Swiper
  modules={[Autoplay, Pagination, Navigation]}
  spaceBetween={0}
  slidesPerView={1}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  navigation={true}
  loop={false}
>
    
        {featured.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="carousel-slide">
              <div className="carousel-image-wrapper">
                <img src={product.image} alt={product.name} className="carousel-img" />
              </div>
              <div className="carousel-content">
                <span className="carousel-tag">Featured Product</span>
                <h2>{product.name}</h2>
                <p className="carousel-price">${product.price}</p>
                <p className="carousel-desc">
                  Premium quality {product.name} — fast shipping, easy returns.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel