"use client";

import timestampToDate from "@/utils/db/timestampToDate";
import TextButton from "@components/general/textButton";
import Input from "@components/general/input";
import { useState, useEffect } from "react";

type Props = {
  id: number;
  title: string;
  description: string;
  date: number;
  content: string;
  saveEdits: (
    id: number,
    title: string,
    description: string,
    date: number,
    content: string,
  ) => void;
  deleteEntry: (id: number) => void;
};

export default function DiaryEntry({
  id,
  title,
  description,
  date,
  content,
  saveEdits,
  deleteEntry,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [entryTitle, setEntryTitle] = useState("");
  const [entryDescription, setEntryDescription] = useState("");
  const [entryDate, setEntryDate] = useState({} as number);
  const [entryContent, setEntryContent] = useState("");

  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryDescription, setNewEntryDescription] = useState("");
  const [newEntryDate, setNewEntryDate] = useState({} as number);
  const [newEntryContent, setNewEntryContent] = useState("");

  useEffect(() => {
    setEntryTitle(title);
    setEntryDescription(description);
    setEntryDate(date);
    setEntryContent(content);
  }, [title, description, date, content]);

  const updateDate = (event: any) => {
    let date = event.target.value;
    date = new Date(date).getTime();
    setNewEntryDate(date);
  };

  const enterEditor = () => {
    setEditing(true);
    setNewEntryTitle(entryTitle);
    setNewEntryDescription(entryDescription);
    setNewEntryDate(entryDate);
    setNewEntryContent(entryContent);
  };

  const saveEntry = () => {
    setEditing(false);
    saveEdits(
      id,
      newEntryTitle,
      newEntryDescription,
      newEntryDate,
      newEntryContent,
    );
  };

  const deleteEntryHandler = () => {
    setEditing(false);
    deleteEntry(id);
  };

  return (
    <article
      key={id}
      id={id.toString()}
      className={`${
        editing ? "bg-dark-background" : ""
      } rounded-xl bg-opacity-50`}
    >
      <section className="flex  justify-between gap-5 p-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          {!editing ? (
            <>
              <h2 className="font-serif text-xl text-primary">{entryTitle}</h2>
              <p>{entryDescription}</p>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Title"
                textColor="gold"
                value={newEntryTitle}
                updateValue={setNewEntryTitle}
              />
              <Input
                type="text"
                placeholder="Description"
                value={newEntryDescription}
                updateValue={setNewEntryDescription}
              />
            </>
          )}
        </div>
        <div className="flex flex-col justify-between items-end">
          {/*TODO: fix edit date not showing*/}
          {!editing ? (
            <p>{timestampToDate(entryDate)}</p>
          ) : (
            <input
              type="date"
              value={newEntryDate}
              onChange={(event) => updateDate(event)}
              className="rounded-lg border-none bg-light-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
            />
          )}
          {!editing ? (
            <TextButton title="Edit" color="gold" onClick={enterEditor} />
          ) : (
            <div className="flex gap-2">
              <TextButton title="Save" color="gold" onClick={saveEntry} />
              <TextButton
                title="Cancel"
                color="red"
                onClick={() => setEditing(false)}
              />
              <TextButton
                title="Delete"
                color="red"
                onClick={deleteEntryHandler}
              />
            </div>
          )}
        </div>
      </section>
      <section className="p-2">
        {!editing ? (
          <span>{entryContent}</span>
        ) : (
          <textarea
            placeholder="Entry"
            value={newEntryContent}
            onChange={(e) => setNewEntryContent(e.target.value)}
            className="w-full rounded-lg border-none bg-light-background text-lg focus:outline-1 focus:outline-primary focus:ring-0"
          ></textarea>
        )}
      </section>
    </article>
  );
}
