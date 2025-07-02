import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useLazyQuery, useMutation } from '@apollo/client';
import { motion, AnimatePresence } from 'framer-motion';

import { GET_AI_IMAGE } from '../utils/queries.js';
import { CHANGE_PROFILE_PIC, SAVE_AI_PIC } from '../utils/mutations.js';

import PromptForm from '../components/artgen/PromtForm.jsx';
import ImagePreview from '../components/artgen/ImagePreview.jsx';
import ActionBar from '../components/artgen/ActionBar.jsx';
import Footer from '../components/Footer.jsx';
import '../assets/css/artGen.css';

function ArtGen() {
  const isAuth = Auth.loggedIn();
  //State
  const [mutationError, setMutationError] = useState(null);
  const [mutationErrorCount, setMutationErrorCount] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [avatarSet, setAvatarSet] = useState(false);
  const [gallerySaved, setGallerySaved] = useState(false);

  // GraphQL Hooks
  const [getAiImage, { loading: loadingImage, data: imageData }] = useLazyQuery(GET_AI_IMAGE);
  const [changeProfilePic, { loading: savingAvatar }] = useMutation(CHANGE_PROFILE_PIC);
  const [saveAiPic, { loading: savingGallery }] = useMutation(SAVE_AI_PIC);

  // Helpers and Callbacks
  const generateAvatar = async (formValues) => {
    try {
      const built = buildPrompt(formValues);
      setPrompt(built);
      await getAiImage({ variables: { prompt: built } });
    } catch (err) {
      // console.error(err);
    }
  };

  const handleSetAvatar = async () => {
    if (!previewUrl) return;
    try {
      await changeProfilePic({ variables: { url: previewUrl } });
      setAvatarSet(true);
      setMutationError(null);
      setMutationErrorCount(0);
    } catch (err) {
      // setErrorMsg("An unexpected error occurred, try again.");
      setMutationErrorCount((prev) => prev + 1);
      setMutationError("Failed to update Avatar. Please try again.");
      // console.error(err);
    }
  };

  const handleSaveToGallery = async () => {
    if (!previewUrl) return;
    try {
      await saveAiPic({ variables: { url: previewUrl } });
      setGallerySaved(true);
    } catch (err) {
      setErrorMsg("An unexpected error occurred, try again.");
      // console.error(err);
    }
  };

  //Effect - whenever query returns, update preview
  useEffect(() => {
    const result = imageData?.getAiImage;
    if (result?.url) {
      setPreviewUrl(result.url);
      setMutationError(null);
      setMutationErrorCount(0);
      setAvatarSet(false);     
      setGallerySaved(false);
    } else if (result?.error) {
      setPreviewUrl('');
      setAvatarSet(false);
      setGallerySaved(false);
      setMutationErrorCount((prev) => prev + 1);
      setMutationError("Failed to generate image. Please try again and make sure you are not including restricted or copyrighted content.");
      // console.error("AI error from backend:", result.error);
    }
  }, [imageData]);

  useEffect(() => {
    if (errorMsg) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [errorMsg]);

  // Render
  const anyLoading = loadingImage || savingAvatar || savingGallery;

  if (!isAuth) return <Navigate to="/login" replace />;

  return (
    <>
      {/* {errorMsg && (<p className="artgen-error-message">{errorMsg}</p>)} */}
      {mutationError && (
        <div className="game-mutation-error-banner">
          <span>
          {mutationError}
          {mutationErrorCount >= 2 && <span> ({mutationErrorCount})</span>}
          </span>
          <button
            onClick={() => {
              setMutationError(null);
              setMutationErrorCount(0);
            }}
            className="game-close-error-button"
            aria-label="Dismiss error"
          >
            X
          </button>
        </div>
      )}
      <section className="artgen-container">

        <PromptForm onSubmit={generateAvatar} isLoading={loadingImage} />

        <AnimatePresence mode="wait">
          <motion.div
            key={previewUrl || 'placeholder'}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="artgen-preview-wrapper"
          >
            <ImagePreview src={previewUrl} isLoading={loadingImage} />

            <ActionBar
              disabled={!previewUrl || anyLoading}
              onSetAvatar={handleSetAvatar}
              onSave={handleSaveToGallery}
              avatarSet={avatarSet}
              gallerySaved={gallerySaved}
            />
          </motion.div>
        </AnimatePresence>
      </section>
      <Footer />
    </>
  );
}

export default ArtGen;

// Util, may move to utils folder
function buildPrompt(values) {
  const { character, style, mood, palette, notes } = values;
  return `${character}, ${style} style${mood ? `, ${mood} mood` : ''}${
    palette ? `, color palette ${palette}` : ''
  }${notes ? `, ${notes}` : ''}`;
}