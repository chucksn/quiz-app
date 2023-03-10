import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setFirstPopup_hidden } from "../redux/slices/firstPopup-slice";
import { setCategory } from "../redux/slices/category-slice";
import { setQuizStarted } from "../redux/slices/startQuiz-slice";
import { setDifficulty } from "../redux/slices/difficulty-slice";
import { setQuizData } from "../redux/slices/quizData-slice";
import { motion, AnimatePresence } from "framer-motion";

const inOut_animation_variant = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 1,
      type: "spring",
      stiffness: 70,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 70,
      ease: "easeInOut",
    },
  },
};

const category_options = [
  { value: 9, label: "General Knowledge" },
  { value: 17, label: "Science and Nature" },
  { value: 18, label: "Computers" },
  { value: 19, label: "Mathematics" },
  { value: 20, label: "Mythology" },
  { value: 22, label: "Geography" },
  { value: 27, label: "Animals" },
  { value: 23, label: "History" },
];

const difficulty_options = [
  { value: "easy", label: "easy" },
  { value: "medium", label: "medium" },
  { value: "hard", label: "hard" },
];

function SelectCategorySlide() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const firstPopup = useSelector((state) => state.firstPopup);
  const category = useSelector((state) => state.category);
  const difficulty = useSelector((state) => state.difficulty);
  const [noCategorySelected, setNoCategorySelected] = useState(true);
  const [noDifficultySelected, setNoDifficultySelected] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    selectedCategory && dispatch(setCategory(selectedCategory.value));
  }, [selectedCategory]);

  useEffect(() => {
    selectedDifficulty && dispatch(setDifficulty(selectedDifficulty.value));
  }, [selectedDifficulty]);

  const getQuizData = async () => {
    let response = await fetch(
      `https://opentdb.com/api.php?amount=15&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    let data = await response.json();
    category && difficulty && dispatch(setQuizData(data));
  };

  const handleStartClick = () => {
    category &&
      difficulty &&
      dispatch(setQuizStarted()) &&
      dispatch(setFirstPopup_hidden());
    if (!category) setNoCategorySelected(false);
    if (!difficulty) setNoDifficultySelected(false);

    getQuizData();
  };

  const handleMenuOpen = () => {
    setNoCategorySelected(true);
    setNoDifficultySelected(true);
  };

  return (
    <>
      <AnimatePresence>
        {firstPopup && (
          <motion.div
            className="quiz-select-category w-11/12 md:w-3/5 lg:w-1/2 bg-gray-300 p-2 sm:p-4 rounded-lg flex flex-col justify-between absolute"
            key="select-category"
            variants={inOut_animation_variant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="border-b-2 border-zinc-400/20 m-4 pb-4 text-center">
              <span className="quiz-title inline-block shadow-s2-dark-amber bg-yellow-500/30 p-2 rounded-lg font-ubuntu font-medium text-amber-800/90 text-2xl md:text-3xl ">
                Trivia Titan
              </span>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div
                className={` select-category-container w-4/5 lg:w-1/2 m-8 rounded-sm ${
                  noCategorySelected ? "" : "shadow-s2-red"
                }`}
              >
                <Select
                  className="category-select  md:text-xl "
                  defaultValue={selectedCategory}
                  onChange={setSelectedCategory}
                  options={category_options}
                  placeholder="Select Category"
                  onMenuOpen={handleMenuOpen}
                />
              </div>
              <div
                className={` select-difficulty-container w-4/5 lg:w-1/2 m-8 rounded-sm ${
                  noDifficultySelected ? "" : "shadow-s2-red"
                }`}
              >
                <Select
                  className="difficulty-select md:text-xl"
                  defaultValue={selectedDifficulty}
                  onChange={setSelectedDifficulty}
                  options={difficulty_options}
                  placeholder="Select Difficulty"
                  onMenuOpen={handleMenuOpen}
                />
              </div>
              <button
                className="p-3 md:text-base bg-sky-700 text-white rounded-lg lg:hover:bg-sky-600 m-2 font-medium"
                onClick={handleStartClick}
              >
                START QUIZ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SelectCategorySlide;
