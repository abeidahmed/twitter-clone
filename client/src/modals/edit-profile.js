import React, { useState } from 'react';
import { ModalWrapper } from 'components/modal-wrapper';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { Textarea } from 'components/textarea';
import { useMutation } from 'react-query';
import { updateUser } from 'api/update-user';
import { useModalType } from 'store/modal';

function EditProfile() {
  const { modalProps } = useModalType();

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
    onSuccess() {
      console.log('success');
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
      console.log(err);
    }
  }

  return (
    <ModalWrapper
      modalTitle="Edit profile"
      button={{ title: 'Save', onSubmit: handleSubmit }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col -mt-10">
        <section className="flex flex-col">
          <div className="-mx-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="p-2 transition duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline-gray hover:bg-gray-600">
                  <input
                    type="file"
                    className="hidden"
                    name="banner"
                    onChange={(e) => setBanner(e.target.files[0])}
                  />
                  <Icon className="w-5 h-5 text-white" icon="camera" />
                </label>
              </div>
              <img
                className="flex-shrink-0 object-cover w-full h-48 bg-gray-100"
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
                alt="User twitter banner"
              />
            </div>
          </div>
          <div className="-mt-10 lg:-mt-16">
            <div className="relative w-20 h-20 overflow-hidden border-4 border-white rounded-full lg:w-32 lg:h-32">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="p-2 transition duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline-gray hover:bg-gray-600">
                  <input
                    type="file"
                    className="hidden"
                    name="avatar"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                  <Icon className="w-5 h-5 text-white" icon="camera" />
                </label>
              </div>
              <img
                className="w-20 h-20 rounded-full lg:w-32 lg:h-32"
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
              value={name}
              error={error}
              errorType="name"
              onChange={(e) => setName(e.target.value)}
            />
            <p
              className={`${
                isThreshold(name.length, 50) ? 'text-red-700' : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {name.length}/50
            </p>
          </div>
          <div>
            <Textarea
              label="Bio"
              placeholder="Add your bio"
              id="profile-bio"
              rows="4"
              resize={false}
              value={bio}
              error={error}
              errorType="bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <p
              className={`${
                isThreshold(bio.length, 50) ? 'text-red-700' : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {bio.length}/160
            </p>
          </div>
          <div>
            <Input
              label="Location"
              placeholder="Add your location"
              id="profile-location"
              value={location}
              error={error}
              errorType="location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <p
              className={`${
                isThreshold(location.length, 50)
                  ? 'text-red-700'
                  : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {location.length}/30
            </p>
          </div>
          <div>
            <Input
              label="Website"
              placeholder="Add your website"
              id="profile-website"
              value={website}
              error={error}
              errorType="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
            <p
              className={`${
                isThreshold(website.length, 50)
                  ? 'text-red-700'
                  : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {website.length}/100
            </p>
          </div>
        </section>
      </form>
    </ModalWrapper>
  );
}

export default EditProfile;
