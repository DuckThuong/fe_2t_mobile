import { useQuery } from "@tanstack/react-query";
import ImageCarousel from "../../../Components/SliderImage";
import { QUERY_KEY } from "../../../configs/apiConfig";
import { imageApi } from "../../../api/api";
import "../style.scss";

export const HomeHeader = () => {
  const { data: imageData } = useQuery({
    queryKey: [QUERY_KEY.GET_USER],
    queryFn: imageApi.getAllImage,
  });
  const imageUrls = imageData?.ImageList?.map((image) => image.ImageURL);
  return (
    <div className="home-header">
      <div className="home-header_image">
        <ImageCarousel image={imageUrls} />
      </div>
    </div>
  );
};
