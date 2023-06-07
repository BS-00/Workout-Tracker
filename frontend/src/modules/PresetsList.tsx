
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Preset {
  w_id: number,
  plan_name: string, 
  days_of_the_week: string[],
  workouts: Workout[]
}

interface Workout {
  e_id: number,
  workout_name: string,
  sets: number,
  reps: number,
  weight: number
}

const PresetsList: React.FC = () => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');


  const fetchRef = useRef(false);

useEffect(() => {
  if (!fetchRef.current) {
    const fetchDataInitially = async () => {
      try {
        let my_res_data = await submituid();
        setPresets(my_res_data);
        console.log('FETCHDATA INITIALLY CALLED!');
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInitially();
    fetchRef.current = true;
  }
}, []);

/*
  useEffect(() => {
    const fetchDataInitially = async () => {

      try {
        let my_res_data = await submituid();
        setPresets(my_res_data);
        console.log('FETCHDATA INITIALLY CALLED!')
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchDataInitially();
  }, []);
  */

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset);
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    try {
    //submitting a get
    let my_res_data = await submituid();
    setPresets(my_res_data); 
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPresets = presets.filter((preset) =>
    preset.plan_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // FUNCTION THAT CONNECTS AND RETURNS THE USER'S WORKOUTS
  async function submituid() { //forsearch: string

    type uidobject = {
      uid: number;
      //search: string;
    };

    if ( sessionStorage.getItem('uid') === undefined ||
        sessionStorage.getItem('uid') === null ) {
      throw new RangeError('NULL or Undefined uid; Check Login!');
    }

    const uid_holder: uidobject = {
      uid: Number(sessionStorage.getItem('uid'))
      //search: forsearch
    };

    let m_res_data: Preset[] = [];

    await axios.post('http://localhost:3001/get-workouts', uid_holder).then(
      res => {
        //let m_res_data: Preset[] = [];
        //m_res_data = res.data;
        
        //console.log(res.data);

        //let m_res_data: Preset[] = [];

        res.data.forEach((w_row: any) => {

          let m_mult_exercises: Workout[] = [];

          w_row.exercises.forEach((e_row: any) => {
            
            const curr_exercise = {
              e_id: e_row.exercise_id,
              workout_name: e_row.exercise_name,
              sets: e_row.sets,
              reps: e_row.reps,
              weight: e_row.weight
            };
            
            m_mult_exercises.push(curr_exercise);

          });

          const curr_workout = {
            w_id: w_row.workout_id,
            plan_name: w_row.workout_name,
            days_of_the_week: w_row.days_of_the_week,
            workouts: m_mult_exercises
          };

          m_res_data.push(curr_workout);

        });

        console.log(m_res_data);
        //setPresets(m_res_data);
    });
    
    return m_res_data;

  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="presets-list">
            <div className="text-center">
            <h2>Search Workouts</h2>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="border" style={{ height: '450px', overflow: 'auto'}}>
            <ul>
              {filteredPresets.map((preset) => (
                <li key={preset.w_id}>
                  <input
                    type="checkbox"
                    checked={selectedPreset !==null && selectedPreset.w_id === preset.w_id}
                    onChange={() => handlePresetChange(preset)}
                  />
                  <label>{preset.plan_name + ' DB_ID: ' + preset.w_id}</label>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="selectedpreset-contents" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:"15%" }}>
            <h2>Selected Workout</h2>
          {selectedPreset ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>{selectedPreset.plan_name}</h3>
            <p>Days of the week: {String(selectedPreset.days_of_the_week)}</p>
            <h4>Workouts:</h4>
          <div className="border" style={{ height: '350px', width: '500px', overflow: 'auto', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', border: '1px solid black', padding: '10px' }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {selectedPreset.workouts.map((workout, index) => (
          <li key={index}>
            <p>Workout Name: {workout.workout_name}</p>
            <p>Sets: {workout.sets}</p>
            <p>Reps: {workout.reps}</p>
            <p>Weight: {workout.weight}</p>
          </li>
        ))}
        </ul>
      </div>
      </div>
    ) : (
      <p>No workout selected</p>
    )}
  </div>
</div>


      </div>
    </div>
  );
};

export default PresetsList;


/*
import React, { useState } from 'react';

function PresetsList(): React.ReactElement {
  const [presets, setPresets] = useState<string[]>(['Beginner', 'Intermediate', 'Advanced']);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // adding custom plans to the presets
  function addtoPresets(newcustom: string): void {
    const nextPresets = [...presets, newcustom];
    setPresets(nextPresets);
  }

  // handling the selection of a preset plan
  const handlePresetSelection = (preset: string): void => {
    if (preset === selectedPreset) {
      setSelectedPreset(null);
    } else {
      setSelectedPreset(preset);
    }
  };

  return (
    <div>
      {presets.map((preset) => (
        <div key={preset}>
          <label>
            {preset}
            <input
              type="checkbox"
              checked={selectedPreset === preset}
              onChange={() => handlePresetSelection(preset)}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default PresetsList;
*/