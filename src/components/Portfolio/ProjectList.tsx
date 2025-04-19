'use client';

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

export default function ProjectList() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc`
        );
        const data = await res.json();
        setRepos(data.slice(0, REPOS_TO_DISPLAY));
      } catch (err) {
        console.error('Erro ao buscar repositórios:', err);
      }
    })();
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Principais Projetos</h2>

      {/* wrapper local para aplicar seletores globais com segurança */}
      <div className={styles.carouselWrapper}>
        <Slider {...settings}>
          {repos.map((repo) => (
            <div key={repo.id} className={styles.projectCard}>
              <h3>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h3>
              <p>{repo.description}</p>
              <div className={styles.stars}>⭐ {repo.stargazers_count}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
