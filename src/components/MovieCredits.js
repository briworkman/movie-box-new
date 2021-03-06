import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCredits } from '../actions/movies';
import { IMG_URL, POSTER_SIZE } from '../utils/config';
import NoImage from '../assets/no_image.jpg';
import { NavLink, Route } from 'react-router-dom';
import ActorInfo from './ActorInfo';

function MovieCredits(props) {
  useEffect(() => {
    props.fetchCredits(props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className='similar-title'>ACTORS</h2>
      <div className='actors'>
        {props.credits.map((actors) => {
          return (
            <div key={actors.id} className='movie-container'>
              <NavLink
                to={{
                  pathname: `/actor/${actors.id}`,
                  props: { actors },
                }}
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={
                    actors.profile_path
                      ? `${IMG_URL}${POSTER_SIZE}${actors.profile_path}`
                      : NoImage
                  }
                  alt='actor thumb'
                />
                <div className='actor-data'>
                  <h3 className='actor-name'>{actors.name}</h3>
                  <p>
                    {actors.character.length > 17
                      ? actors.character.substring(0, 17, 3) + '...'
                      : actors.character}
                  </p>
                </div>
              </NavLink>
              <Route
                exact
                path='/actor/:id'
                render={(props) => (
                  <ActorInfo {...props} id={actors.id} key={actors.id} />
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    credits: state.credits,
  };
};

export default connect(mapStateToProps, {
  fetchCredits,
})(MovieCredits);
