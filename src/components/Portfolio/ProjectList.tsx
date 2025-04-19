'use client'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './ProjectList.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface GitHubRepo {
  id: number;
  html_url: string;
  name: string;
  description: string | null;
  stargazers_count: number;
}

const GITHUB_USERNAME = 'narradorww';
const REPOS_TO_DISPLAY = 8;

const ProjectList = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc`);
        const data = await response.json();
        const topRepos = data.slice(0, REPOS_TO_DISPLAY);
        setRepos(topRepos);
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
      }
    };

    fetchRepos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '0',
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Principais Projetos</h2>
      <Slider {...settings}>
        {repos.map((repo: GitHubRepo) => (
          <div key={repo.id} className={styles.projectCard}>
            <h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <div className={styles.stars}>
              ⭐ {repo.stargazers_count}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectList;
