import "./VideoCard.scss";

export default function VideoCard({ video, onVideoClick }) {
  const formatDuration = (seconds) => {
    if (!seconds) return "Unknown";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count) => {
    if (!count) return "Unknown views";
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const handleClick = () => {
    if (onVideoClick) {
      onVideoClick(video);
    }
  };

  return (
    <div className="video-card" onClick={handleClick}>
      <div className="video-thumbnail">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNDAgNzBMMTcwIDEwMEwxNDAgMTMwVjcwWiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K';
          }}
        />
        <div className="video-duration">
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="video-info">
        <h3 className="video-title" title={video.title}>
          {video.title}
        </h3>
        
        <div className="video-meta">
          <span className="video-uploader">{video.uploader}</span>
          <span className="video-views">{formatViewCount(video.view_count)}</span>
        </div>
        
        {video.description && (
          <p className="video-description" title={video.description}>
            {video.description.length > 100 
              ? `${video.description.substring(0, 100)}...` 
              : video.description
            }
          </p>
        )}
      </div>
    </div>
  );
}
