import React from 'react';
import AddNovelSection from '../../components/ControlRoom/AddNovelSection/AddNovelSection';
import AddAuthorSection from '../../components/ControlRoom/AddAuthorSection/AddAuthorSection';
import AddGenreSection from '../../components/ControlRoom/AddGenreSection/AddGenreSection';
import AssignNovelToGenreSection from '../../components/ControlRoom/AssignNovelToGenreSection/AssignNovelToGenreSection';
import DeleteNovelSection from '../../components/ControlRoom/DeleteNovelSection/DeleteNovelSection';
import DeleteAuthorSection from '../../components/ControlRoom/DeleteAuthorSection/DeleteAuthorSection';
import DeleteGenreSection from '../../components/ControlRoom/DeleteGenreSection/DeleteGenreSection';
import UnassignNovelFromGenreSection from '../../components/ControlRoom/UnassignNovelFromGenreSection/UnassignNovelFromGenreSection';
import EditNovelSection from '../../components/ControlRoom/EditNovelSection/EditNovelSection';
import EditAuthorSection from '../../components/ControlRoom/EditAuthorSection/EditAuthorSection';
import EditGenreSection from '../../components/ControlRoom/EditGenreSection/EditGenreSection';
import './ControlRoom.css';

const ControlRoom = () => {
    return (
        <div className="control-room">
            <h1>Control Room</h1>
            <AddNovelSection />
            <AddAuthorSection />
            <AddGenreSection />
            <AssignNovelToGenreSection />
            <DeleteNovelSection />
            <DeleteAuthorSection />
            <DeleteGenreSection />
            <UnassignNovelFromGenreSection />
            <EditNovelSection />
            <EditAuthorSection />
            <EditGenreSection />
        </div>
    );
};

export default ControlRoom;