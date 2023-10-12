"use client";

import updateDiaryEncryptionStatus from "@/utils/db/diary/updateDiaryEncryptedStatus";
import sortDiaryEntriesByDate from "@/utils/diary/sortDiaryEntriesByDate";
import saveMainDiaryChanges from "@/utils/db/diary/saveMainDiaryChanges";
import ConfirmationModal from "@/components/general/confirmationModal";
import updateDiaryEntry from "@/utils/db/diary/updateDiaryEntry";
import updateDiaryOrder from "@/utils/db/diary/updateDiaryOrder";
import Notification from "@/components/general/notification";
import { useAuthContext } from "@/lib/context/authContext";
import timestampToDate from "@/utils/db/timestampToDate";
import TextButton from "@/components/general/textButton";
import deleteDiary from "@/utils/db/diary/deleteDiary";
import DiaryEntry from "@/components/diary/diaryEntry";
import encryptEntry from "@/utils/diary/encryptEntry";
import decryptEntry from "@/utils/diary/decryptEntry";
import dateConverter from "@/utils/db/dateConverter";
import getDiary from "@/utils/db/diary/getDiary";
import { DiaryContent } from "@lib/types/diary";
import Input from "@/components/general/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Diaries({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const [key, setKey] = useState(params.slug.replace(/%20/g, " "));

  const [diaryEntries, setDiaryEntries] = useState([] as DiaryContent[]);
  const [usedDiaryEntries, setUsedDiaryEntries] = useState(
    [] as DiaryContent[],
  );

  const [diaryName, setDiaryName] = useState("");
  const [diaryDescription, setDiaryDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [addingEntry, setAddingEntry] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryDescription, setNewEntryDescription] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryDate, setNewEntryDate] = useState("");

  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success",
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const [modal, setModal] = useState(false);

  const [moreInfo, setMoreInfo] = useState(false);

  const [entryOrderReversed, setEntryOrderReversed] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  /**
   * 1. Search by title
   * 2. Search by date
   * 3. Search by description
   * 4. Search by content
   */
  const [searchSettings, setSearchSettings] = useState([1, 0, 0, 0]);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search by title");

  useEffect(() => {
    if (user) {
      const diary = getDiary(key);
      diary.then((data) => {
        if (!data) {
          return;
        }
        setDiaryName(data.name);
        setDiaryDescription(data.description);
        setCreatedAt(dateConverter(data.createdAt));
        setUpdatedAt(dateConverter(data.updatedAt));
        setEntryOrderReversed(data.entryOrderReversed);
        setIsEncrypted(data.encrypted);
        const reversedOrder = data.entryOrderReversed;
        new Promise((resolve) => {
          resolve(
            sortDiaryEntriesByDate(
              data.diaryContent as any[],
              reversedOrder as boolean,
            ),
          );
        }).then((sortedData) => {
          setDiaryEntries(sortedData as DiaryContent[]);
        });
      });
    }
  }, []);

  useEffect(() => {
    if (diaryEntries.length > 0) {
      setUsedDiaryEntries(diaryEntries);
    }
  }, [diaryEntries]);

  // fix reload to redirect to signin
  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);

  const startEditing = () => {
    setEditing(true);
    setNewName(diaryName);
    setNewDescription(diaryDescription);
  };

  const saveChanges = async () => {
    if (newName === diaryName && newDescription === diaryDescription) {
      setEditing(false);
      return;
    }
    if (newName === "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Diary name cannot be empty.");
      return;
    }

    setDiaryName(newName);
    setDiaryDescription(newDescription);
    setEditing(false);
    saveMainDiaryChanges(key, newName, newDescription);

    setNotification(true);
    setNotificationTitle("Success");
    setNotificationType("success");
    setNotificationMessage("Diary changes saved.");
  };

  const addEntry = () => {
    setAddingEntry(true);
    setNewEntryDate(new Date().toISOString().slice(0, 10));
    setNewEntryTitle("");
    setNewEntryDescription("");
    setNewEntryContent("");
  };

  const createEntry = async () => {
    if (newEntryTitle == "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Entry title cannot be empty.");
      return;
    }
    if (newEntryDate == "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Entry date cannot be empty.");
      return;
    }
    if (newEntryContent == "") {
      setNotification(true);
      setNotificationTitle("Error");
      setNotificationType("error");
      setNotificationMessage("Entry content cannot be empty.");
      return;
    }

    const id = Math.random().toString(32).substring(2);

    const entry = {
      title: newEntryTitle,
      description: newEntryDescription,
      date: new Date(newEntryDate).getTime(),
      lastUpdated: new Date(),
      content: newEntryContent,
      id: id,
    };

    const encryptedEntry = encryptEntry(entry, key + id);

    const newDiaryEntries = [...diaryEntries];

    if (isEncrypted) {
      newDiaryEntries.push(encryptedEntry);
    } else {
      newDiaryEntries.push(entry);
    }

    updateDiaryEntry(key, newDiaryEntries);

    new Promise((resolve) => {
      resolve(
        sortDiaryEntriesByDate(newDiaryEntries as any[], entryOrderReversed),
      );
    }).then((sortedData) => {
      setDiaryEntries(sortedData as DiaryContent[]);
    });

    setAddingEntry(false);
  };

  const saveEditsToEntry = (
    id: number,
    title: string,
    description: string,
    date: number,
    content: string,
  ) => {
    const entry = diaryEntries[id];

    let oldDate = entry.date;

    entry.title = title;
    entry.description = description;
    entry.date = date;
    entry.content = content;
    entry.lastUpdated = new Date();

    const encryptedEntry = encryptEntry(entry, key + entry.id);

    const newDiaryEntries = [...diaryEntries];
    if (isEncrypted) {
      newDiaryEntries[id] = encryptedEntry;
    } else {
      newDiaryEntries[id] = entry;
    }

    updateDiaryEntry(key, newDiaryEntries);

    if (oldDate != date) {
      new Promise((resolve) => {
        resolve(
          sortDiaryEntriesByDate(newDiaryEntries as any[], entryOrderReversed),
        );
      }).then((sortedData) => {
        setDiaryEntries(sortedData as DiaryContent[]);
      });
    } else {
      setDiaryEntries(newDiaryEntries);
    }

    setNotification(true);
    setNotificationTitle("Success");
    setNotificationType("success");
    setNotificationMessage("Diary changes saved.");
  };

  const confirmDiaryDeletion = async () => {
    setModal(false);
    await deleteDiary(key);
    router.push("/account/diaries");
  };

  const deleteDiaryEntry = (id: number) => {
    const newDiaryEntries = diaryEntries.filter((entry, index) => index !== id);
    setDiaryEntries(newDiaryEntries);
    setUsedDiaryEntries(newDiaryEntries);
    updateDiaryEntry(key, newDiaryEntries);
  };

  const reverseEntryOrder = () => {
    const newOrder = !entryOrderReversed;
    setEntryOrderReversed(newOrder);
    updateDiaryOrder(key, newOrder);
    const diaryEntriesReversed = [...diaryEntries];

    setDiaryEntries(diaryEntriesReversed.reverse());
  };

  const selectSearchSettings = (index: number) => {
    const newSearchSettings = [0, 0, 0, 0];
    newSearchSettings[index] = 1;
    setSearchSettings(newSearchSettings);

    switch (index) {
      case 0:
        setSearchPlaceholder("Search by title");
        break;
      case 1:
        setSearchPlaceholder("Search by date");
        break;
      case 2:
        setSearchPlaceholder("Search by description");
        break;
      case 3:
        setSearchPlaceholder("Search by content");
    }
  };

  useEffect(() => {
    if (searchValue == "") {
      setUsedDiaryEntries(diaryEntries);
      return;
    }
    const newDiaryEntries = diaryEntries.filter((entry) => {
      switch (searchSettings.indexOf(1)) {
        case 0:
          return entry.title.toLowerCase().includes(searchValue.toLowerCase());
        case 1:
          return timestampToDate(entry.date)
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        case 2:
          return entry.description
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        case 3:
          return entry.content
            .toLowerCase()
            .includes(searchValue.toLowerCase());
      }
    });
    setUsedDiaryEntries(newDiaryEntries);
  }, [searchValue, searchSettings]);

  const encryptDiary = () => {
    const normalDiary = diaryEntries;
    const encryptedDiary = normalDiary.map((entry) => {
      return encryptEntry(entry, key + entry.id);
    });

    updateDiaryEntry(key, encryptedDiary);
    setDiaryEntries(encryptedDiary);
    setUsedDiaryEntries(encryptedDiary);
    setIsEncrypted(true);
    updateDiaryEncryptionStatus(key, true);
  };

  const decryptDiary = () => {
    const encryptedDiary = diaryEntries;
    const decryptedDiary = encryptedDiary.map((entry) => {
      return decryptEntry(entry, key + entry.id);
    });

    updateDiaryEntry(key, decryptedDiary);
    setDiaryEntries(decryptedDiary);
    setUsedDiaryEntries(decryptedDiary);
    setIsEncrypted(false);
    updateDiaryEncryptionStatus(key, false);
  };

  return (
    <>
      <section className="flex flex-col">
        {!editing ? (
          <>
            <h1 className="text-center font-serif text-5xl text-primary">
              {diaryName}
            </h1>
            <p v-if="!isEditing" className="text-lg">
              {diaryDescription}
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Diary Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mb-2 bg-opacity-0 text-center font-serif text-5xl text-primary rounded-lg border-none bg-light-background placeholder:text-primary placeholder:opacity-40 focus:ring-primary p-2"
            />
            <textarea
              className="rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
              placeholder="Diary Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
          </>
        )}
        <section className="flex flex-col justify-center mt-5 rounded-xl bg-light-background p-2">
          <section className="flex gap-2 justify-between">
            <p>Created: {createdAt}</p>
            <button
              className="rounded-md hover:bg-opacity-50 transition-all"
              onClick={() => setMoreInfo(!moreInfo)}
            >
              {moreInfo ? (
                <svg
                  fill="#E8EDDF"
                  width="20px"
                  height="20px"
                  viewBox="-5 -7.5 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                >
                  <path d="M7.071 2.828l-4.95 4.95A1 1 0 0 1 .707 6.364L6.364.707a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414l-4.95-4.95z" />
                </svg>
              ) : (
                <svg
                  fill="#E8EDDF"
                  width="20px"
                  height="20px"
                  viewBox="-5 -8 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                >
                  <path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z" />
                </svg>
              )}
            </button>
            <p>Last Update: {updatedAt}</p>
          </section>
          {moreInfo ? (
            <section>
              <p>{`Entries: ${diaryEntries.length}`}</p>
              <section className="flex justify-between">
                {`Encrypted: ${isEncrypted ? "Yes" : "No"}`}
                {isEncrypted ? (
                  <TextButton
                    title="Decrypt"
                    color="red"
                    onClick={() => {
                      decryptDiary();
                    }}
                  />
                ) : (
                  <TextButton
                    title="Encrypt"
                    color="gold"
                    onClick={() => {
                      encryptDiary();
                    }}
                  />
                )}
              </section>
            </section>
          ) : null}
        </section>
        <section className="mt-5 flex gap-2 justify-between">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            updateValue={setSearchValue}
          />
          <div className="bg-light-background rounded-xl flex items-center justify-center px-3">
            <button
              className={`rounded-md hover:bg-opacity-50 transition-all p-1 ${
                searchSettings[0] == 1 ? "bg-primary" : ""
              }`}
              onClick={() => selectSearchSettings(0)}
            >
              <svg
                fill="#242423"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
              >
                <path
                  d="M46.5,0v139.6h23.3c0-23.3,0-69.8,23.3-93.1c23.2-23.3,46.5-23.3,69.8-23.3h46.5v395.6c0,34.9-11.6,69.8-46.5,69.8l-22.8,0
	l-0.5,23.2h232.7v-23.3h-23.3c-34.9,0-46.5-34.9-46.5-69.8V23.3h46.5c23.3,0,46.5,0,69.8,23.3s23.3,69.8,23.3,93.1h23.3V0H46.5z"
                />
              </svg>
            </button>
          </div>
          <div className="bg-light-background rounded-xl flex items-center justify-center px-3">
            <button
              className={`rounded-md hover:bg-opacity-50 transition-all p-1 ${
                searchSettings[1] == 1 ? "bg-primary" : ""
              }`}
              onClick={() => selectSearchSettings(1)}
            >
              <svg
                fill="#242423"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
              >
                <path d="M2,19c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-8H2V19z M19,4h-2V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H9V3c0-0.6-0.4-1-1-1S7,2.4,7,3v1H5C3.3,4,2,5.3,2,7v2h20V7C22,5.3,20.7,4,19,4z" />
              </svg>
            </button>
          </div>
          <div className="bg-light-background rounded-xl flex items-center justify-center px-3">
            <button
              className={`rounded-md hover:bg-opacity-50 transition-all p-1 ${
                searchSettings[2] == 1 ? "bg-primary" : ""
              }`}
              onClick={() => selectSearchSettings(2)}
            >
              <svg
                fill="#242423"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                version="1.2"
                baseProfile="tiny"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 4c1.279 0 2.559.488 3.535 1.465l3.465 3.535 5 5-7 7-5.498-5.498c-.037.033-3.037-2.967-3.037-2.967-1.953-1.953-1.953-5.119 0-7.07.976-.977 2.256-1.465 3.535-1.465m0-2c-1.87 0-3.628.729-4.949 2.051-1.322 1.32-2.051 3.078-2.051 4.948s.729 3.628 2.051 4.95l3 3c.107.107.227.201.35.279l5.187 5.186c.391.391.9.586 1.413.586s1.022-.195 1.414-.586l7-7c.78-.781.78-2.047 0-2.828l-5-5-3.45-3.521c-1.337-1.336-3.095-2.065-4.965-2.065zM9 7.498c.829 0 1.5.672 1.5 1.502s-.671 1.498-1.5 1.498-1.5-.668-1.5-1.498.671-1.502 1.5-1.502m0-1c-1.379 0-2.5 1.122-2.5 2.502 0 1.377 1.121 2.498 2.5 2.498s2.5-1.121 2.5-2.498c0-1.38-1.121-2.502-2.5-2.502z" />
              </svg>
            </button>
          </div>
          <div className="bg-light-background rounded-xl flex items-center justify-center px-3">
            <button
              className={`rounded-md hover:bg-opacity-50 transition-all p-1 ${
                searchSettings[3] == 1 ? "bg-primary" : ""
              }`}
              onClick={() => selectSearchSettings(3)}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="#242423"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 12h14M5 16h6"
                />
              </svg>
            </button>
          </div>
          <div className="bg-light-background rounded-xl flex items-center justify-center px-3">
            <button
              className={`rounded-md hover:bg-opacity-50 transition-all p-1 ${
                entryOrderReversed ? "bg-primary" : ""
              }`}
              onClick={reverseEntryOrder}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L8 7.414V19a1 1 0 1 1-2 0V7.414L3.707 9.707a1 1 0 0 1-1.414-1.414l4-4zM16 16.586V5a1 1 0 1 1 2 0v11.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L16 16.586z"
                  fill="#242423"
                />
              </svg>
            </button>
          </div>
        </section>
      </section>
      <section
        className={`mt-5 rounded-xl bg-light-background p-2 flex ${
          entryOrderReversed ? "flex-col-reverse" : "flex-col"
        } gap-2`}
      >
        <div>
          {usedDiaryEntries.map((entry, index) => (
            <DiaryEntry
              key={entry.id}
              id={index}
              title={entry.title}
              description={entry.description}
              date={entry.date}
              content={entry.content}
              encrypted={isEncrypted}
              encryptionKey={key + entry.id}
              saveEdits={(
                id: number,
                title: string,
                description: string,
                date: number,
                content: string,
              ) => saveEditsToEntry(id, title, description, date, content)}
              deleteEntry={() => deleteDiaryEntry(index)}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center justify-center">
            <TextButton
              title="Add Entry"
              color="gold"
              onClick={() => {
                addEntry();
              }}
            />
          </div>
          {addingEntry ? (
            <section>
              <section className="flex items-center justify-between p-2 gap-2">
                <div className="flex w-full flex-col justify-center gap-2">
                  <Input
                    type="text"
                    placeholder="Entry Title"
                    value={newEntryTitle}
                    updateValue={setNewEntryTitle}
                  />
                  <Input
                    type="text"
                    placeholder="Entry Description"
                    value={newEntryDescription}
                    updateValue={setNewEntryDescription}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={newEntryDate}
                    onChange={(e) => setNewEntryDate(e.target.value)}
                    className="rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
                  />
                </div>
              </section>
              <section className="p-2">
                <textarea
                  cols={30}
                  rows={10}
                  placeholder="Entry"
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                  className="w-full rounded-lg border-none bg-dark-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
                ></textarea>
              </section>
              <section className="flex gap-2 pl-2">
                <TextButton
                  title="Save"
                  color="gold"
                  onClick={() => {
                    createEntry();
                  }}
                />
                <TextButton
                  title="Cancel"
                  color="red"
                  onClick={() => {
                    setAddingEntry(false);
                  }}
                />
              </section>
            </section>
          ) : null}
        </div>
      </section>
      <section className="mt-5 flex justify-between rounded-xl bg-light-background p-2">
        {!editing ? (
          <TextButton
            title="Edit"
            color="gold"
            onClick={() => {
              startEditing();
            }}
          />
        ) : (
          <section className="flex gap-2">
            <TextButton
              title="Save"
              color="gold"
              onClick={() => {
                saveChanges();
              }}
            />
            <TextButton
              title="Cancel"
              color="red"
              onClick={() => {
                setEditing(!editing);
              }}
            />
          </section>
        )}
        <TextButton
          title="Delete"
          color="red"
          onClick={() => {
            setModal(true);
          }}
        />
      </section>
      {notification ? (
        <Notification
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotification={(value) => setNotification(value)}
        />
      ) : null}
      {modal ? (
        <ConfirmationModal
          title="Delete"
          message="Enter the name of the diary to delete."
          inputVisible={true}
          inputIsPassword={false}
          expectedInput={diaryName}
          confirmText="Delete"
          cancelText="Cancel"
          confirmAction={() => confirmDiaryDeletion()}
          cancelAction={() => setModal(false)}
        />
      ) : null}
    </>
  );
}
