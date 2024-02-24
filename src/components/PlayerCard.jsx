import { baseImgUrl } from "../constants";

const PlayerCard = ({ player }) => {
  return (
    <div className="w-[150px] rounded">
      {player.profile_path ? (
        <img src={baseImgUrl + player?.profile_path} />
      ) : (
        <div className="h-[225px] bg-gray-600"></div>
      )}

      <h2 className="font-bold text-lg">{player.original_name}</h2>
      <h3 className="line-clamp-2">{player.character}</h3>
    </div>
  );
};

export default PlayerCard;
