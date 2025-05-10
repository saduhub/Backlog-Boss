import { useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner.jsx';
// import '../../assets/css/artGen.css';
import './prompt-form.css'

function PromptForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    character: '',
    style: '',
    mood: '',
    palette: '',
    notes: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="artgen-form"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="artgen-field">
        <span>Character / Subject</span>
        <input
          name="character"
          value={form.character}
          onChange={handleChange}
          required
        />
      </label>

      <label className="artgen-field">
        <span>Style</span>
        <select name="style" value={form.style} onChange={handleChange} required>
          <option value="" disabled>
            Select…
          </option>
          <option value="pixel art">Pixel Art</option>
          <option value="comic book">Comic Book</option>
          <option value="realistic">Realistic</option>
          <option value="anime">Anime</option>
        </select>
      </label>

      <label className="artgen-field">
        <span>Mood</span>
        <select name="mood" value={form.mood} onChange={handleChange}>
          <option value="">Optional</option>
          <option value="bright">Bright</option>
          <option value="dark">Dark</option>
          <option value="nostalgic">Nostalgic</option>
        </select>
      </label>

      <label className="artgen-field">
        <span>Color Palette</span>
        <input
          name="palette"
          value={form.palette}
          onChange={handleChange}
          placeholder="e.g. cool blues"
        />
      </label>

      <label className="artgen-field">
        <span>Additional Notes</span>
        <input
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="lighting, camera angle..."
        />
      </label>

      <button
        className="artgen-generate-btn"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner small /> : 'Generate'}
      </button>
    </motion.form>
  );
}

export default PromptForm;
