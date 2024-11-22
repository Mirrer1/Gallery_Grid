import React from 'react';
import { UserAddOutlined } from '@ant-design/icons';

import {
  UserBio,
  UserProfileWrapper,
  UserSearchContainer,
  UserSearchContent,
  UserSearchDivider,
  UserStatsWrapper
} from 'styles/AppLayout/userSearch';

const UserSearch = () => {
  return (
    <>
      <UserSearchContainer>
        <UserSearchContent>
          <UserProfileWrapper>
            <img src="https://i.pinimg.com/236x/cb/63/46/cb6346d5fd059c736ccf8232f2d55b0a.jpg" alt="" />
            <p>LoremLoremLoremi</p>
          </UserProfileWrapper>

          <UserBio>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur error ipsam inventore quae neque eos,
              unde natus in harum architecto animi perspiciatis impedit, ullam doloremque quos labore dolores non
              aperiam corporis veniam consequuntur velit. Aspernatur temporibus culpa eveniet ipsum, voluptatum,
              mollitia dolorum accusantium, consectetur minus doloribus repellat! Enim error minus obcaecati ipsum
              minima, laudantium nemo voluptate exercitationem deleniti sed ad veniam illum eos nulla beatae magnam quam
              quisquam soluta quaerat qui ipsa est quod ea dolores? Exercitationem, fuga. Eaque neque dolorum sunt
              quibusdam culpa. Corporis vitae eligendi, quos, veniam hic possimus deserunt nemo qui repudiandae iste
              vero enim culpa! Officiis doloremque accusantium atque quaerat ea reprehenderit perferendis pariatur
              reiciendis, numquam corrupti debitis dolorum consectetur mollitia voluptatum, aliquam autem animi amet
              placeat, culpa quas molestias sed facere delectus? Deleniti vero repudiandae, maiores tenetur veniam
              incidunt eligendi soluta, rem atque reiciendis tempore officia iusto hic suscipit harum dolore dolores
              ipsum unde et minima blanditiis maxime perspiciatis excepturi sit! Facere consectetur impedit inventore
              maiores. Fugiat assumenda veniam et, est quidem harum consequuntur odio cum? Ea quia consectetur voluptate
              dignissimos laudantium odio quisquam vel. Rerum, optio? Accusantium, atque. Magnam minus obcaecati laborum
              amet dignissimos rem nisi, aliquid tempora vitae accusantium inventore nesciunt cupiditate animi!
            </p>

            <div>
              <UserAddOutlined />
            </div>
          </UserBio>

          <UserSearchDivider />

          <UserStatsWrapper>
            <div>
              <div>
                <span>3</span>
                <p>Followers</p>
              </div>

              <div>
                <span>3</span>
                <p>Followings</p>
              </div>
            </div>

            <div>
              <img src="https://i.pinimg.com/236x/cb/63/46/cb6346d5fd059c736ccf8232f2d55b0a.jpg" alt="" />

              <p>
                LoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremi
              </p>
              <time>2014.2.20</time>
            </div>
          </UserStatsWrapper>
        </UserSearchContent>
      </UserSearchContainer>
      <UserSearchContainer>
        <UserSearchContent>
          <UserProfileWrapper>
            <img src="https://i.pinimg.com/236x/cb/63/46/cb6346d5fd059c736ccf8232f2d55b0a.jpg" alt="" />
            <p>LoremLoremLoremi</p>
          </UserProfileWrapper>

          <UserBio>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur error ipsam inventore quae neque eos,
              unde natus in harum architecto animi perspiciatis impedit, ullam doloremque quos labore dolores non
              aperiam corporis veniam consequuntur velit. Aspernatur temporibus culpa eveniet ipsum, voluptatum,
              mollitia dolorum accusantium, consectetur minus doloribus repellat! Enim error minus obcaecati ipsum
              minima, laudantium nemo voluptate exercitationem deleniti sed ad veniam illum eos nulla beatae magnam quam
              quisquam soluta quaerat qui ipsa est quod ea dolores? Exercitationem, fuga. Eaque neque dolorum sunt
              quibusdam culpa. Corporis vitae eligendi, quos, veniam hic possimus deserunt nemo qui repudiandae iste
              vero enim culpa! Officiis doloremque accusantium atque quaerat ea reprehenderit perferendis pariatur
              reiciendis, numquam corrupti debitis dolorum consectetur mollitia voluptatum, aliquam autem animi amet
              placeat, culpa quas molestias sed facere delectus? Deleniti vero repudiandae, maiores tenetur veniam
              incidunt eligendi soluta, rem atque reiciendis tempore officia iusto hic suscipit harum dolore dolores
              ipsum unde et minima blanditiis maxime perspiciatis excepturi sit! Facere consectetur impedit inventore
              maiores. Fugiat assumenda veniam et, est quidem harum consequuntur odio cum? Ea quia consectetur voluptate
              dignissimos laudantium odio quisquam vel. Rerum, optio? Accusantium, atque. Magnam minus obcaecati laborum
              amet dignissimos rem nisi, aliquid tempora vitae accusantium inventore nesciunt cupiditate animi!
            </p>

            <div>
              <UserAddOutlined />
            </div>
          </UserBio>

          <UserSearchDivider />

          <UserStatsWrapper>
            <div>
              <div>
                <span>3</span>
                <p>Followers</p>
              </div>

              <div>
                <span>3</span>
                <p>Followings</p>
              </div>
            </div>

            <div>
              <img src="https://i.pinimg.com/236x/cb/63/46/cb6346d5fd059c736ccf8232f2d55b0a.jpg" alt="" />

              <p>
                LoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremiLoremLoremLoremi
              </p>
              <time>2014.2.20</time>
            </div>
          </UserStatsWrapper>
        </UserSearchContent>
      </UserSearchContainer>
    </>
  );
};

export default UserSearch;
