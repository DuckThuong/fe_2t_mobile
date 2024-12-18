import ImageCarousel from "../../../Components/SliderImage";
import "../style.scss";

interface Props {
  imageUrls?: string[];
  className?: string;
}
export const HomeHeader: React.FC<Props> = ({ imageUrls, className }) => {
  return (
    <div className={className}>
      <div className="home-header_image">
        <ImageCarousel image={imageUrls} />
      </div>
    </div>
  );
};
