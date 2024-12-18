import ImageCarousel from "../../../Components/SliderImage";

export const HomeHeader = () => {
  const image = [];
  return (
    <div className="home-header">
      <div className="home-header_image">
        <ImageCarousel image={image} />
      </div>
    </div>
  );
};
