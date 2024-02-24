import { baseImgUrl } from "../constants";

const DetailDisplay = ({ title, data }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-1">{title}</h2>

      <div className="flex gap-5">
        {data.map((item) =>
          item.logo_path ? (
            <div key={item.name} className="p-2 rounded bg-white">
              <img
                className="w-[100px] h-[60px] object-contain"
                src={baseImgUrl + item.logo_path}
              />
            </div>
          ) : (
            <span key={item.name} className="text-red-900 font-semibold bg-white p-2 rounded">{item.name}</span>
          )
        )}
      </div>
    </div>
  );
};

export default DetailDisplay;
