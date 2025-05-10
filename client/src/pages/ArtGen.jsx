import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { motion, AnimatePresence } from 'framer-motion';

import { GET_AI_IMAGE } from '../utils/queries.js';
import { CHANGE_PROFILE_PIC, SAVE_AI_PIC } from '../utils/mutations.js';

import PromptForm from '../components/artgen/PromtForm.jsx';
import ImagePreview from '../components/artgen/ImagePreview.jsx';
import ActionBar from '../components/artgen/ActionBar.jsx';
import '../assets/css/artGen.css';

function ArtGen() {
  const [previewUrl, setPreviewUrl] = useState('');
  const [prompt, setPrompt] = useState('');

  // GraphQL Hooks
  const [getAiImage, { loading: loadingImage, data: imageData, error: imageErr }] =
    useLazyQuery(GET_AI_IMAGE);
  const [changeProfilePic, { loading: savingAvatar }] =
    useMutation(CHANGE_PROFILE_PIC);
  const [saveAiPic, { loading: savingGallery }] =
    useMutation(SAVE_AI_PIC);

  // Helpers and Callbacks
  const generateAvatar = (formValues) => {
    const built = buildPrompt(formValues);
    setPrompt(built);
    getAiImage({ variables: { prompt: built } });
  };

  const handleSetAvatar = async () => {
    if (!previewUrl) return;
    try {
      await changeProfilePic({ variables: { url: previewUrl } });
      alert('Profile picture updated!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveToGallery = async () => {
    if (!previewUrl) return;
    try {
      await saveAiPic({ variables: { url: previewUrl } });
      alert('Saved to your gallery!');
    } catch (err) {
      console.error(err);
    }
  };

  //Effect - whenever query returns, update preview
  useEffect(() => {
    if (imageData?.getAiImage?.url) {
      setPreviewUrl(imageData.getAiImage.url);
    }
    if (imageErr) alert('Something went wrong. Try again.');
  }, [imageData, imageErr]);

  // Render
  const anyLoading = loadingImage || savingAvatar || savingGallery;

  return (
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
          />
        </motion.div>
      </AnimatePresence>
    </section>
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
