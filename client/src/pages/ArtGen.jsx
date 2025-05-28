import { useState, useEffect } from 'react';
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
  const generateAvatar = (formValues) => {
    const built = buildPrompt(formValues);
    setPrompt(built);
    setErrorMsg('');
    getAiImage({ variables: { prompt: built } });
  };

  const handleSetAvatar = async () => {
    if (!previewUrl) return;
    try {
      await changeProfilePic({ variables: { url: previewUrl } });
      setAvatarSet(true);
    } catch (err) {
      setErrorMsg("An unexpected error occurred, try again.");
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
      setErrorMsg('');
      setAvatarSet(false);     
      setGallerySaved(false);
    } else if (result?.error) {
      setPreviewUrl('');
      setAvatarSet(false);
      setGallerySaved(false);
      // console.error("AI error from backend:", result.error);

      const messageMap = {
        image_generation_user_error: "Your prompt likely includes restricted content or names. Please try rewording it.",
        empty_prompt: "Prompt cannot be empty. Please describe what you'd like generated.",
        no_image_data: "The image could not be generated. Try a different style or subject.",
        unknown_error: "Something went wrong. Please try again later.",
      };

      setErrorMsg(messageMap[result.error] || "An unexpected error occurred.");
    }
  }, [imageData]);

  useEffect(() => {
    if (errorMsg) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [errorMsg]);

  // Render
  const anyLoading = loadingImage || savingAvatar || savingGallery;

  return (
    <>
      {errorMsg && (<p className="artgen-error-message">{errorMsg}</p>)}
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