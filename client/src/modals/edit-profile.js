import React, { useState } from 'react';
import { ModalWrapper } from 'components/modal-wrapper';
import { useMutation, queryCache } from 'react-query';
import { useModalType } from 'store/modal';
import { useCurrentUser } from 'store/current-user';
import { updateUser } from 'api/update-user';
import { Input } from 'components/input';
import { Textarea } from 'components/textarea';
import { Avatar } from 'components/avatar';
import { FileUpload } from 'components/file-upload';
import { TwitterBanner } from 'components/twitter-banner';
import { CharTracker } from 'components/char-tracker';

function EditProfile() {
  const { modalProps, modalOff } = useModalType();
  const { setUser } = useCurrentUser();

  const [name, setName] = useState(modalProps.name || '');
  const [bio, setBio] = useState(modalProps.bio || '');
  const [location, setLocation] = useState(modalProps.location || '');
  const [website, setWebsite] = useState(modalProps.website || '');
  const [avatar, setAvatar] = useState(modalProps.avatar || '');
  const [banner, setBanner] = useState(modalProps.banner || '');
  const [error, setError] = useState([]);

  function isThreshold(current, limit) {
    return current > limit;
  }

  const [mutate, { isLoading }] = useMutation(updateUser, {
    onSuccess({ data }) {
      queryCache.refetchQueries('showUser');
      setUser(data);
      modalOff();
    },
    throwOnError: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await mutate({
        id: modalProps.id,
        name,
        bio,
        location,
        website,
        avatar,
        banner,
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <ModalWrapper
      modalTitle="Edit profile"
      button={{
        title: 'Save',
        onSubmit: handleSubmit,
        disabled: isLoading,
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col -mt-10">
        <section className="flex flex-col">
          <div className="-mx-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileUpload
                  name="banner"
                  size="sm"
                  color="overlay"
                  icon="camera"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
              </div>
              <TwitterBanner
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
                alt="User twitter banner"
              />
            </div>
          </div>
          <div className="-mt-10 lg:-mt-16">
            <div className="relative w-20 h-20 overflow-hidden border-4 border-white rounded-full lg:w-32 lg:h-32">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileUpload
                  name="avatar"
                  size="sm"
                  color="overlay"
                  icon="camera"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              <Avatar
                size="xl"
                src={modalProps.avatar}
                alt="User profile picture"
              />
            </div>
          </div>
        </section>
        <section className="mt-4 space-y-2">
          <div>
            <Input
              label="Name"
              placeholder="Add your name"
              id="profile-name"
              autoComplete="off"
              value={name}
              error={error}
              errorType="name"
              onChange={(e) => setName(e.target.value)}
            />
            <CharTracker
              size="sm"
              current={name.length}
              limit={50}
              className="mt-1 text-right"
            />
          </div>
          <div>
            <Textarea
              label="Bio"
              placeholder="Add your bio"
              id="profile-bio"
              autoComplete="off"
              rows="4"
              resize={false}
              value={bio}
              error={error}
              errorType="bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <CharTracker
              size="sm"
              current={bio.length}
              limit={160}
              className="mt-1 text-right"
            />
          </div>
          <div>
            <Input
              label="Location"
              placeholder="Add your location"
              id="profile-location"
              autoComplete="off"
              value={location}
              error={error}
              errorType="location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <CharTracker
              size="sm"
              current={location.length}
              limit={30}
              className="mt-1 text-right"
            />
          </div>
          <div>
            <Input
              label="Website"
              placeholder="Add your website"
              id="profile-website"
              autoComplete="off"
              value={website}
              error={error}
              errorType="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
            <CharTracker
              size="sm"
              current={website.length}
              limit={100}
              className="mt-1 text-right"
            />
          </div>
        </section>
      </form>
    </ModalWrapper>
  );
}

export default EditProfile;
