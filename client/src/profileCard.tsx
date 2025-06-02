import './profile.css'

function ProfileCard({ data }: { data: any }) {
  return (
    <div className="profile-card">
        <img
        className="profile-image"
        src={data.profilePictureUrl || 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'}  
        alt=""
        />
        <div className="profile-details">
        <h3 className="profile-name">{data.firstName} {data.lastName}</h3>
        <p className="profile-headline">{data.headline}</p>
        <p className="profile-bio">
            {data.bio}
        </p>
        <p className="profile-interests">
            <strong>Interests:</strong> {data.interests?.join(', ')} 
        </p>
        </div>
    </div>
  )
}

export default ProfileCard
