import React, { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import { useModalType } from 'store/modal';
import { useCurrentUser } from 'store/current-user';
import { useCharTracker } from 'hooks/useCharTracker';
import * as limit from 'shared/char-limit';
import * as q from 'shared/query-key';
import { updateUser } from 'api/update-user';
import { ModalWrapper } from '../ModalWrapper';
import { Avatar } from 'components/Avatar';
import { File } from 'components/Field';
import { Banner } from 'components/Banner';
import { InputWithCharTracker, TextareaWithCharTracker } from './components';

function EditProfile() {
  const { modalProps, modalOff } = useModalType();
  const {
    name: userName,
    bio: userBio,
    location: userLocation,
    website: userWebsite,
    avatar: userAvatar,
    banner: userBanner,
  } = modalProps;

  const { setUser } = useCurrentUser();

  const [name, setName] = useCharTracker(userName || '', limit.NAME_CHAR);
  const [bio, setBio] = useCharTracker(userBio || '', limit.BIO_CHAR);
  const [location, setLocation] = useCharTracker(
    userLocation || '',
    limit.LOCATION_CHAR
  );
  const [website, setWebsite] = useCharTracker(
    userWebsite || '',
    limit.WEBSITE_CHAR
  );
  const [avatar, setAvatar] = useCharTracker(userAvatar || '');
  const [banner, setBanner] = useState(userBanner || '');
  const [error, setError] = useState([]);

  const [mutate, { isLoading }] = useMutation(updateUser, {
    onSuccess({ data }) {
      queryCache.refetchQueries(q.SHOW_USER);
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
      spacing="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col -mt-10">
        <section className="flex flex-col">
          <div className="-mx-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <File
                  name="banner"
                  size="sm"
                  appearance="overlay"
                  icon="camera"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
              </div>
              <Banner
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
                alt="User twitter banner"
              />
            </div>
          </div>
          <div className="-mt-10 lg:-mt-16">
            <div className="relative w-20 h-20 overflow-hidden border-4 border-white rounded-full lg:w-32 lg:h-32">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <File
                  name="avatar"
                  size="sm"
                  appearance="overlay"
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
          <InputWithCharTracker
            label="Name"
            placeholder="Add your name"
            id="profile-name"
            value={name}
            error={error}
            errorType="name"
            onChange={setName}
            charLength={name.length}
            charLimit={limit.NAME_CHAR}
          />
          <TextareaWithCharTracker
            label="Bio"
            placeholder="Add your bio"
            id="profile-bio"
            rows={4}
            resize={false}
            value={bio}
            error={error}
            errorType="bio"
            onChange={setBio}
            charLength={bio.length}
            charLimit={limit.BIO_CHAR}
          />
          <InputWithCharTracker
            label="Location"
            placeholder="Add your location"
            id="profile-location"
            value={location}
            error={error}
            errorType="location"
            onChange={setLocation}
            charLength={location.length}
            charLimit={limit.LOCATION_CHAR}
          />
          <InputWithCharTracker
            label="Website"
            placeholder="Add your website"
            id="profile-website"
            autoComplete="off"
            value={website}
            error={error}
            errorType="website"
            onChange={setWebsite}
            charLength={website.length}
            charLimit={limit.WEBSITE_CHAR}
          />
        </section>
      </form>
    </ModalWrapper>
  );
}

export default EditProfile;
