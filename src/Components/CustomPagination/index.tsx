import { FC } from 'react';
import { SvgNextPage } from '../@svg/SvgNextPage';
import { SvgPreviousPage } from '../@svg/SvgPreviousPage';

interface Props {
  page: number;
  total: number;
  totalItems: number;
  isLoadding?: boolean;
  onChange: (page: number) => void;
}

const CustomPanigation: FC<Props> = (props) => {
  const { page, total, totalItems, isLoadding, onChange } = props;

  const handlePreviousPage = () => {
    if (page && page > 1) {
      onChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (total && Number(total) > Number(page) * Number(totalItems)) {
      onChange(page + 1);
    }
  };

  return (
    <div>
      {!isLoadding ? (
        <div className="custom-pagination d-flex justify-content-center align-items-center">
          <div className="cursor-pointer left p-r-8" onClick={handlePreviousPage}>
            <SvgPreviousPage />
          </div>
          <span className="table-wrap__pagination-page">{page || 1}</span>
          <div className="cursor-pointer right p-l-8" onClick={handleNextPage}>
            <SvgNextPage />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomPanigation;
